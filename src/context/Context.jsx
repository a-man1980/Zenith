// Usually, you will pass information from a parent component to a child component via props.
// But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, or if many components in your app need the same information.
// Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.
/*

createContext() creates a new context object that will hold and provide shared data to components.
export const Context = createContext(); creates a new context named Context. By exporting it, other components can access and consume this context.
ContextProvider Component

This is a custom provider component that wraps around other components to make context data available to them.
Context.Provider

React provides the .Provider component for every context created using createContext().
This component makes the value prop available to all components within its child tree that consume the context.
contextValue

This is an object (or any value) that you want to share with all components using this context.
In this example, it’s an empty object {}, but typically, you’d populate it with data, functions, or state that you want to share.
props.children

This allows the ContextProvider to wrap its child components.
Any component inside the ContextProvider can access the shared context
*/

import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context=createContext();
const ContextProvider = (props) =>{

    // state variable for taking input
    const[input,setInput]=useState("");
    // state variable for maintaing recent prompt
    const[recentPrompt,setRecentPrompt]=useState("");
    // state variable for maintaing previous prompt
    const[prevPrompts,setprevPrompts]=useState([]);
    // state variable for if the result is shown to the user(hide the cards on the homescreen if true)
    const[showResult,setShowResult]=useState(false);
    // state variabble to handle if the data is loaded from the api(loading animation will be shown if true)
    const[loading,setLoading]=useState(false);
    // state variable to hold result data
    const[resultData,setResultData]=useState("");

    // function to create typing effect
    // we will use settimeout function to create a delay
    const delayPara = (index,nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    // new chat functionality
    const newChat = () =>{
        setLoading(false);
        setShowResult(false);
    }


    const onSent = async(prompt)=>{
        setResultData("");//to remove the previous answer our in variable
        setLoading(true);//for showing maybe some loading animations
        setShowResult(true);//for displaying result this need to be true
        // result should also be produced if a prompt has been sent to the onsent function(any recent prompt got clicked)
        let response="";
        if(prompt!==undefined){
            // we got a prompt in onSent function
            response=await runChat(prompt);
            setRecentPrompt(prompt);
            // we do not add it into recent prompts like we did in normal input entry case
        }else{
            setRecentPrompt(input);//setting the most recent prompt equal to input given by user
            setprevPrompts(prev=>[...prev,input]);//spreading previous and adding input to it
            const lcInput=input
            response=await runChat(lcInput.toLowerCase());
        }
        // after this response we have a string containg ** which need to be replaced by bold and 
        // * with next line,for this we use string.split to create array and loop to create or new string

        // changing **
        let responseArray = response.split("**");
        let newResponse="";
        for(let i=0;i<responseArray.length;i++){
            if(i%2===0){
                // even indices as it is
                newResponse+=responseArray[i];
            }else{
                // odd indices se just pehle aur baad me </b> tag
                newResponse+="<b>"+responseArray[i]+"</b>";
            }
        }

        // changing *
        let newResponse2=newResponse.split("*").join("</br>");
        
        // creating typing effect
        let newResponseArray=newResponse2.split(" ");//empty string will denote next word
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord=newResponseArray[i];
            delayPara(i,nextWord+" ")//space to distinguish words
        }
        setLoading(false);//doing it false so as to stop loading animation
        setInput(""); //clearing the input field
    }
    

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setprevPrompts,
        showResult,
        loading,
        resultData,
        onSent,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;