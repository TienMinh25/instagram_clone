import { Box, Flex } from '@chakra-ui/react';
import Message from './Message';

export default function ChatConversation({ activeUser }) {
  // Mock data: conversations of each user
  const conversations = {
    1: [
      { id: 1, text: 'Hello!', sender: 'User 1' },
      { id: 2, text: 'Hi, how are you?Hi, how are you?Hi, how are you?Hi, how are you?Hi, how are you?Hi, how are you?Hi, how are you?Hi, how are you?Hi, how are you?Hi, how are you?Hi, how are you?Hi, how are you?Hi, how are you?Hi, how are you?', sender: 'User 1' },
      { id: 3, text: 'I\'m fine, thank you!', sender: 'User 1' },
      { id: 4, text: 'What have you been up to?', sender: 'You' },
      { id: 5, text: 'Just working on some projects.', sender: 'User 1' },
      { id: 6, text: 'That sounds interesting!', sender: 'You' },
      { id: 7, text: 'Yes, it\'s very rewarding.', sender: 'You' },
      { id: 8, text: 'Glad to hear that.', sender: 'You' },
      { id: 9, text: 'Thanks! What about you?', sender: 'User 1' },
      { id: 10, text: 'I\'ve been learning to code.', sender: 'You' },
      { id: 11, text: 'That\'s awesome!', sender: 'User 1' },
      { id: 12, text: 'It\'s challenging but fun.', sender: 'You' },
      { id: 13, text: 'I can imagine!', sender: 'User 1' },
      { id: 14, text: 'Do you code as well?', sender: 'You' },
      { id: 15, text: 'A bit, yes.', sender: 'User 1' },
      { id: 16, text: 'What languages do you know?', sender: 'You' },
      { id: 17, text: 'JavaScript and Python.', sender: 'User 1' },
      { id: 18, text: 'Great choices!', sender: 'You' },
      { id: 19, text: 'Thanks!', sender: 'User 1' },
      { id: 20, text: 'What projects are you working on?', sender: 'You' },
      { id: 21, text: 'A web app for productivity.', sender: 'User 1' },
      { id: 22, text: 'Sounds useful.', sender: 'You' },
      { id: 23, text: 'I hope so!', sender: 'User 1' },
      { id: 24, text: 'I\'m sure it will be.', sender: 'You' },
      { id: 25, text: 'Appreciate that.', sender: 'User 1' },
      { id: 26, text: 'No problem.', sender: 'You' },
      { id: 27, text: 'Do you need any help?', sender: 'User 1' },
      { id: 28, text: 'Not at the moment, thanks.', sender: 'You' },
      { id: 29, text: 'Okay, let me know if you do.', sender: 'User 1' },
      { id: 30, text: 'Will do!', sender: 'You' },
    ],
    2: [
      { id: 1, text: 'Hi there!', sender: 'User 2' },
      { id: 2, text: 'Hey, how\'s it going?', sender: 'You' },
      { id: 3, text: 'Pretty good, and you?', sender: 'User 2' },
      { id: 4, text: 'Not too bad, thanks.', sender: 'You' },
      { id: 5, text: 'What are you up to?', sender: 'User 2' },
      { id: 6, text: 'Just relaxing. You?', sender: 'You' },
      { id: 7, text: 'Same here.', sender: 'User 2' },
      { id: 8, text: 'Nice to hear.', sender: 'You' },
      { id: 9, text: 'Do you have any plans for today?', sender: 'User 2' },
      { id: 10, text: 'Not really. You?', sender: 'You' },
      { id: 11, text: 'Might watch a movie.', sender: 'User 2' },
      { id: 12, text: 'Which one?', sender: 'You' },
      { id: 13, text: 'Not sure yet. Any recommendations?', sender: 'User 2' },
      { id: 14, text: 'How about Inception?', sender: 'You' },
      { id: 15, text: 'I\'ve seen it, it\'s great!', sender: 'User 2' },
      { id: 16, text: 'Yes, it is!', sender: 'You' },
      { id: 17, text: 'Maybe I\'ll watch it again.', sender: 'User 2' },
      { id: 18, text: 'Good choice.', sender: 'You' },
      { id: 19, text: 'Thanks!', sender: 'User 2' },
      { id: 20, text: 'Enjoy your movie.', sender: 'You' },
      { id: 21, text: 'Will do.', sender: 'User 2' },
      { id: 22, text: 'Take care.', sender: 'You' },
      { id: 23, text: 'You too.', sender: 'User 2' },
      { id: 24, text: 'Bye!', sender: 'You' },
      { id: 25, text: 'See you!', sender: 'User 2' },
      { id: 26, text: 'Later!', sender: 'You' },
      { id: 27, text: 'Catch you later.', sender: 'User 2' },
      { id: 28, text: 'For sure.', sender: 'You' },
      { id: 29, text: 'Alright, bye for now.', sender: 'User 2' },
      { id: 30, text: 'Bye!', sender: 'You' },
    ],
    3: [
      { id: 1, text: 'Hey!', sender: 'User 3' },
      { id: 2, text: 'Hi, what\'s up?', sender: 'You' },
      { id: 3, text: 'Not much. You?', sender: 'User 3' },
      { id: 4, text: 'Just working.', sender: 'You' },
      { id: 5, text: 'Busy day?', sender: 'User 3' },
      { id: 6, text: 'Yes, a lot to do.', sender: 'You' },
      { id: 7, text: 'Hope you get through it quickly.', sender: 'User 3' },
      { id: 8, text: 'Thanks!', sender: 'You' },
      { id: 9, text: 'Do you need any help?', sender: 'User 3' },
      { id: 10, text: 'No, I\'m good. Appreciate it.', sender: 'You' },
      { id: 11, text: 'Anytime.', sender: 'User 3' },
      { id: 12, text: 'How\'s your day going?', sender: 'You' },
      { id: 13, text: 'Pretty relaxed.', sender: 'User 3' },
      { id: 14, text: 'That\'s nice.', sender: 'You' },
      { id: 15, text: 'Yes, indeed.', sender: 'User 3' },
      { id: 16, text: 'Got any plans for later?', sender: 'You' },
      { id: 17, text: 'Maybe go for a walk.', sender: 'User 3' },
      { id: 18, text: 'Sounds good.', sender: 'You' },
      { id: 19, text: 'Yes, I need some fresh air.', sender: 'User 3' },
      { id: 20, text: 'Enjoy your walk.', sender: 'You' },
      { id: 21, text: 'Thanks!', sender: 'User 3' },
      { id: 22, text: 'You\'re welcome.', sender: 'You' },
      { id: 23, text: 'Catch you later.', sender: 'User 3' },
      { id: 24, text: 'Will do.', sender: 'You' },
      { id: 25, text: 'Goodbye.', sender: 'User 3' },
      { id: 26, text: 'Bye!', sender: 'You' },
      { id: 27, text: 'Take care.', sender: 'User 3' },
      { id: 28, text: 'You too.', sender: 'You' },
      { id: 29, text: 'See you soon.', sender: 'User 3' },
      { id: 30, text: 'Definitely.', sender: 'You' },
    ]
  };


  if (!activeUser) {
    return
    <>
      <Flex p={4}>Select a user to start a conversation</Flex>;

    </>
  }

  const messages = conversations[activeUser.id] || [];

  return (
    <Box p={4}>
      {messages.map((message, index) => (
        <Message
          key={message.id}
          text={message.text}
          sender={message.sender}
          position={message.sender === 'You' ? 'right' : 'left'}
          showSender={
            (index === messages.length - 1) || // Show sender for the last message
            (message.sender !== messages[index + 1]?.sender) // Or if the sender changes
          }
        />
      ))}
    </Box>
  );
}
