import { useState, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { Select, Input, Divider, Typography } from 'antd';

import './PlayViewer.css';

const { Option } = Select;
const { Search } = Input;
const { Text } = Typography;

/**
Play text viewer. Contains the play navigation menu and the play text.
*/
const PlayViewer = (props) => {
    // Some values are initially set via props
    const [ currentAct, setAct ] = useState(props.acts[0]);
    const [ currentScene, setScene ] = useState(props.acts[0].scenes[0]);
    const [ currentPlayer, setPlayer ] = useState(null);
    const [ searchWords, setSearchWords ] = useState([]);
    
    const textRef = useRef(null); // Reference for the text section element
    
    // Generate list of players
    const players = [];
    currentScene.speeches.forEach(s => {
        if (!players.includes(s.speaker)) {
            players.push(s.speaker);
        }
    });
    
    // Filter speeches if a player is selected
    const speeches = currentPlayer ?
            currentScene.speeches.filter(s => s.speaker === currentPlayer)
            : currentScene.speeches;
    
    /**
    Resets the scroll position of the play text box. For resetting the view
    whenever the act or scene changes.
    */
    const resetScroll = () => {
        textRef.current.scroll({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    /**
    Called when the user changes the current act. The scene is also set to the
    first scene in the act, and 'players' is reset to 'all players'.
    */
    const handleActChange = (value) => {
        const newAct = props.acts.find(a => a.name === value);
        setAct(newAct);
        setScene(newAct.scenes[0]); // Set scene to first scene of the act
        setPlayer(null); // Set player to all players
        
        resetScroll();
    };
    
    /**
    Called when the user changes the current scene. The 'players' option is
    also reset to 'all players'.
    */
    const handleSceneChange = (value) => {
        const newScene = currentAct.scenes.find(s => s.name === value);
        setScene(newScene);
        setPlayer(null); // Set player to all players
        
        resetScroll();
    };
    
    /**
    Called when the user changes the current player.
    */
    const handlePlayerChange = (value) => {
        setPlayer(value);
    }
    
    /**
    Called when the user either submits or clears the search terms box. Updates
    the list of words to highlight.
    */
    const handleSearch = (value) => {
        setSearchWords(value.split(' '));
    };
    
    return (
        <div id='play-viewer'>
            <aside>
                <h3>Play Navigation</h3>
                <Select value={currentAct.name} onChange={handleActChange}>
                    { props.acts.map(a => (
                        <Option value={a.name} key={a._id}>{a.name}</Option>
                    )) }
                </Select>
                <Select value={currentScene.name} onChange={handleSceneChange}>
                    { currentAct.scenes.map(s => (
                        <Option value={s.name} key={s._id}>{s.name}</Option>
                    )) }
                </Select>
                <Select value={currentPlayer} onChange={handlePlayerChange}>
                    <Option value={null}>ALL PLAYERS</Option>
                    { players.map(p => (
                        <Option value={p} key={p}>{p}</Option>
                    )) }
                </Select>
                <h3>Highlight Text</h3>
                <Text type='secondary'>Enter each word to highlight, separated by spaces.</Text>
                <Search
                    placeholder='Enter search terms'
                    onSearch={handleSearch}
                    enterButton
                    allowClear />
            </aside>
            <Divider type='vertical' />
            <section ref={textRef}>
                <h2>{props.title}</h2>
                <article>
                    <h3>{currentAct.name}</h3>
                    <div>
                        <h4>{currentScene.name}</h4>
                        <p className='title'>{currentScene.title}</p>
                        <p className='direction'>{currentScene.stageDirection}</p>
                        { speeches.map(s => (
                            <div key={s._id} className='speech'>
                                <span className='speaker'>{s.speaker}</span>
                                { s.lines.map((line, i) => (
                                    <p key={i}>
                                        <Highlighter
                                             highlightClassName="highlight"
                                             searchWords={searchWords}
                                             autoEscape={true}
                                             textToHighlight={line} />
                                    </p>
                                ))}
                            </div>
                        )) }
                    </div>
                </article>
            </section>
        </div>
    );
};

export default PlayViewer;