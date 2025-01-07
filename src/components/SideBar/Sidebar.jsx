import React, { useContext,useState } from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context';

function Sidebar() {
    // state variable for extendidng and dextending sidebar
    const [extended, setExtended] = useState(false);
    // using prevprompts properties using usecontext
    const { onSent, prevPrompts, setRecentPrompt ,newChat} = useContext(Context);


    // function to load prompts when  prompt from recents is clicked
    const loadPrompt = async(prompt)=>{
        setRecentPrompt(prompt);//setting recentprompt to the prompt clicked
        await onSent(prompt);
        // we will get the "prompt" from the recent entry div connecting both
    }


    return (
        <div className='sidebar'>
            <div className='top'>
                <img onClick={() => setExtended(prev => !prev)} className="menu_i" src={assets.menu_icon} alt="" />
                <div onClick={()=>newChat()}className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {/* //if extended is true then only show new chat */}
                    {extended ? <p>New Chat</p> : null}
                </div>
                {/* //if extended is true then only show recent*/}
                {extended ?
                    <div className="recent">
                        <p className='recent-title'>Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                // on clickiing this recent entry div it will call loadprompt function 
                                <div onClick={()=>loadPrompt(item)}className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0,15)}...</p> 
                                    {/* slice property such that entire prompt doesnot get displayed */}
                                </div>
                            )

                        })}
                    </div> : null
                }

            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>History</p> : null}
                </div>

                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Setting</p> : null}
                </div>

            </div>
        </div>
    )
}

export default Sidebar