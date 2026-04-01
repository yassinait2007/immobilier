// import { ChatMessage } from "@/types/chat";
// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { useAuth } from "../authentication/auth-context";
// import { createEchoInstance, getEcho } from "@/Echo";

// type Listener = (msg: ChatMessage) => void;

// interface WebsocketContextType {
//   addListener: (listener: Listener) => void;
//   removeListener: () => void;
// }

// const WebsocketContext = createContext<WebsocketContextType>({
//   addListener: () => {},
//   removeListener: () => {},
// });

// export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
//   // store only a single listener in state
//   const [listener, setListener] = useState<Listener | null>(null);
//   const { isAuthenticated, user } = useAuth();

//   // addListener replaces the previous listener
//   const addListener = (newListener: Listener) => {
//     setListener(() => newListener); // replace previous listener
//     console.log("listener added/replaced");
//   };

//   // removeListener sets the listener to null
//   const removeListener = () => {
//     setListener(null);
//     console.log("listener removed");
//   };

//   // WebSocket effect
//   useEffect(() => {
//     // only listen if user is authenticated and has an id
//     if (!isAuthenticated || !user?.id) return;
//     console.log("=======ctx===========Echo config:", {
//       key: import.meta.env.VITE_REVERB_APP_KEY,
//       host: import.meta.env.VITE_WS_HOST,
//       port: 8080,
//     });

//     console.log("=======ctx===========Echo config:");
//     console.log("web-socket:", " current-user-", user);
//     console.log("websocket: ", "listen to channel-", user?.id);

//     createEchoInstance();
//     const channel = getEcho().private(`chat.${user.id}`);

//     // callback will call the current listener if it exists
//     const callback = ({ message }: { message: ChatMessage }) => {
//       console.log("web-socket : message : ", message);
//       if (listener) {
//         listener(message);
//       }
//     };

//     channel.listen("MessageSent", callback);

//     // cleanup function
//     return () => {
//       channel.stopListening("MessageSent", callback);
//       getEcho().leave(`chat.${user?.id}`);
//       console.log("websocket: ", "leave channel");
//     };
//   }, [isAuthenticated, user?.id, listener]); // re-run effect when listener changes

//   return (
//     <WebsocketContext.Provider value={{ addListener, removeListener }}>
//       {children}
//     </WebsocketContext.Provider>
//   );
// };

// export const useWebSocket = () => useContext(WebsocketContext);
