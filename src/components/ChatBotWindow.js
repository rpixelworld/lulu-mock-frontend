import '../assets/css/ChatBotWindow.scss';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import Constants from '../Constants';
import axios from 'axios';

const ChatBotWindow = ({ closeWindow }) => {
	const [conversations, setConversations] = useState([]);
	const [message, setMessage] = useState('');
	const conversationEndRef = useRef(null);

	const handlerMessage = ({ target }) => {
		const { value } = target;
		setMessage(value);
	};

	const resetConversation = ()=> {

		axios.post(`${Constants.BACKEND_BASE_URL}/chat/reset`)
			.then(resp => {
				setConversations(conversations.splice(0, 1))
			})
	}

	const submitHandler = source => {
		if (!message.trim()) {
			setMessage('');
			return
		}
		const prompt = message;
		setConversations(prevConversations => [...prevConversations, { role: source, content: message }]);
		setMessage('');

		axios.post(`${Constants.BACKEND_BASE_URL}/chat/prompt`, {prompt: prompt})
			.then(resp => {
				if(resp.data.status = 'success') {
					if(Array.isArray(resp.data.data)) {
						resp.data.data.forEach(conv => {
							setConversations(prevConversations => [...prevConversations, { role: conv.role, content: conv.content }])
						})
					}
					else {
						setConversations(prevConversations => [...prevConversations, { role: resp.data.data.role, content: resp.data.data.content }])
					}
				}
			})

	};

	// make sure the newest message show at the end
	useEffect(() => {
		if (conversationEndRef.current) {
			conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [conversations]);

	useEffect(() => {
		// setConversations([{ role: "system", content: "My name is LULUBot, I am your shopping assistent. How can I help you today?" }])
		axios.get(`${Constants.BACKEND_BASE_URL}/chat/history`)
			.then(resp => {
				if(resp.data.status = 'success') {
					if(Array.isArray(resp.data.data)) {
						resp.data.data.forEach(conv => {
							setConversations(prevConversations => [...prevConversations, { role: conv.role, content: conv.content }])
						})
					}
					else {
						setConversations(prevConversations => [...prevConversations, { role: resp.data.data.role, content: resp.data.data.content }])
					}
				}
			})
	}, []);

	return (
		<div className="chatBotWindow-baseBord">
			{/*nav*/}
			<div className="chatWindow-nav">
				<div className="reset"><span onClick={resetConversation}>Reset History</span></div>
				<div className='icon'>
					<MinimizeIcon onClick={closeWindow} />
				</div>
				<div className='icon'>
					<CloseIcon onClick={closeWindow} />
				</div>
			</div>

			<div className="conversation">
				{conversations?.map(item => (
					<div className={item.role === 'user' ? 'userMessage' : 'AIMessage'}>
						{item.role === 'user' ? (
							<PersonIcon className="person-head" />
						) : (
							<SmartToyIcon className="AIhead" />
						)}
						<p>{item.content}</p>
					</div>
				))}
				<div ref={conversationEndRef} style={{ marginBottom: '10px' }} className="chatBotMessage" />
			</div>
			{/*users input*/}
			<div className="chatButtonLine">
				<div className="input-message">
					<input className="message" type="text" value={message} onChange={handlerMessage} onKeyDown={(e)=>{e.key=='Enter'&&submitHandler('user')}}/>
				</div>
				<div className="send-button" onClick={() => submitHandler('user')}>Send</div>
			</div>
			{/*robot input*/}
			{/*<div className="chatButtonLine">*/}
			{/*	<input type="text" value={message} onChange={handlerMessage} />*/}
			{/*	<button onClick={() => submitHandler('robotInput')}>Send</button>*/}
			{/*</div>*/}
		</div>
	);
};

export default ChatBotWindow;
