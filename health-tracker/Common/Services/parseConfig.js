import Parse from "parse/dist/parse.min.js";


const Env  = {
  APPLICATION_ID: "kZVJTYM8C7k89Nk5l9U6eAlKuagCVbJNiwFGScUH",
  JAVASCRIPT_KEY: "7Zz49wph0Mxj3HPqc2SkI4VQWUxgS4HmVCfngmTm",
  SERVER_URL: "https://parseapi.back4app.com/"
}

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;


console.log(" Parse initialized");

export default Parse;