import GraphChild from "./GraphChild";

const GraphParent = () => {
    const keywords = ["sleep", "mood"]; //send to AI to generate graphs (can change/be added to as necessary)
  return (
    <div>
        <h1>Graphs</h1>
      {keywords.map((keyword) => (
        <GraphChild keyword={keyword} />
      ))}
    </div>
  );
};

export default GraphParent;
