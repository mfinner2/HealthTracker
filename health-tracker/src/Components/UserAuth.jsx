import { useState } from "react";
import { Form, Button, Alert } from 'react-bootstrap';
import { signUpUser, logInUser, getCurrentUser } from '../../Common/Services/authService';

export default function UserAuth({ onAuthSuccess }) {
	const [mode, setMode] = useState('login'); // login or signup
	const [username, setUsername] = useState(''); 
	const [password, setPassword] = useState(''); 
	const [email, setEmail] = useState(''); 
	const [error, setError] = useState(''); 
	const [loading, setLoading] = useState(false); 

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			if (mode === 'signup'){
				await signUpUser(username, password, email);
			} else {
				await logInUser(username, password);
			}
			const user = getCurrentUser();
			onAuthSuccess?.(user);
		} catch (err) {
			setError(err.message || "error.");
		} finally {
			setLoading(false);
		}
	};

	const toggleMode = () => {
		setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
		setError('');
	};

	return (
		<div className="p-3 border rounded shador-sm bg-light" style={{ maxWidth: 400, margin: '0 auto' }}>
			<h4 className="text-center mb-3">{mode === 'login' ? 'Log In' : 'Sign up'}</h4>

			{error && <Alert variant="danger">{error}</Alert>}

			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-2">
					<Form.Label>Username</Form.Label>
					<Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
				</Form.Group>
				<Form.Group className="mb-2">
					<Form.Label>Password</Form.Label>
					<Form.Control value={password} onChange={(e) => setPassword(e.target.value)} required />
				</Form.Group>
				{mode === 'signup' && (
					<Form.Group className="mb-2">
						<Form.Label>Email</Form.Label>
						<Form.Control value={email} onChange={(e) => setEmail(e.target.value)} required />
					</Form.Group>
				)}

				<Button type="submit" variant="primary" className="m-100" disabled={loading}>
					{loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Sign Up'}
				</Button>
			</Form>

			<div className="text-center mt-3">
				<small>
					{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
					<Button variant="link" onClick={toggleMode} className="p-0">
						{mode === 'login' ? 'Sign up here' : 'Log in here'}
					</Button>
				</small>
			</div>

		</div>
	)
	
}