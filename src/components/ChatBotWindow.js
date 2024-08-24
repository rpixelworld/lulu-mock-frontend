import '../assets/css/ChatBotWindow.scss'
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

const ChatBotWindow = ({closeWindow}) => {
	const [conversations, setConversations] = useState([]);
	const [message, setMessage] = useState('');
	const conversationEndRef = useRef(null);

	const handlerMessage=({target})=>{
		const {value} = target;
		setMessage(value)
	}

	const submitHandler=(source)=>{
		if (message.trim()) {
			setConversations(prevConversations =>
				[...prevConversations, {text:message,source}]);
		}
		setMessage('');
	}
	// make sure the newest message show at the end
	useEffect(() => {
		if (conversationEndRef.current) {
			conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [conversations]);

	return <div className='chatBotWindow-baseBord'>
		{/*nav*/}
		<div className='chatWindow-nav'>
			<div><MinimizeIcon onClick={closeWindow}/></div>
			<div><CloseIcon onClick={closeWindow}/></div>
		</div>

		<div className="conversation">
			{conversations?.map((item) => (
					<div className={item.source === 'userInput' ? 'userMessage' : 'AIMessage'}>
						{item.source==='userInput' ?<PersonIcon className='person-head'/> :<SmartToyIcon className='AIhead'/>}
						<p>{item.text}</p>
					</div>))}
			<div ref={conversationEndRef} style={{ marginBottom: '10px' }} className="chatBotMessage" />
		</div>
		{/*users input*/}
		<div className="chatButtonLine">
			<input type="text"
				   value={message}
					onChange={handlerMessage}/>
			<button onClick={()=>submitHandler('userInput')}>Send</button>
		</div>
		{/*robot input*/}
		<div className="chatButtonLine">
			<input type="text"
				   value={message}
				   onChange={handlerMessage} />
			<button onClick={() => submitHandler('robotInput')}>Send</button>
		</div>

	</div>
}

export default ChatBotWindow;