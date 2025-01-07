import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

function Main() {
    // using our functions other data using usecontext
    const { input, setInput, recentPrompt, showResult, loading, resultData, onSent } = useContext(Context);
    return (
        <div className="main">
            <div className="nav">
                <p>Zenith</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ?
                    <>
                        <div className="greet">
                            <p><span>Hello there</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            {/* card1 */}
                            <div className="card">
                                <p>Suggest beautiful places to see in India</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>

                            {/* card2 */}
                            <div className="card">
                                <p>Write a short note on rural empowerment.</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>

                            {/* card3 */}
                            <div className="card">
                                <p>Fun Game Ideas for Get Together Parties</p>
                                <img src={assets.message_icon} alt="" />
                            </div>

                            {/* card4 */}
                            <div className="card">
                                <p>Help Me with the following Code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>

                    </> :
                    // if showresult is true display a div containing resut
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.falcon_icon} alt="" />
                            {/* using loading to check if to show loader animation or result */}
                            {loading
                                ? <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                // if we pass resultdata directly it will be shown completely with the html tags also 
                            }
                        </div>

                    </div>

                }

                {/* searchbar */}
                <div className="main-bottom">
                    <div className="search-box">
                        {/* associating our input state variable with the placeholder using value and calling setinput on change */}
                        {/* also invoking onsent function on enter key */}
                        <input type="text" onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onSent(); // Call your send function
                            }
                        }} placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {/* when the send icon is clicked onsent function is clled which uses input as parameter and executes */}
                            {/* send button will only be visible if there is something input */}
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Zenith uses Gemini Api and hence may produce inaccurate results.
                        Please verify before use.
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Main