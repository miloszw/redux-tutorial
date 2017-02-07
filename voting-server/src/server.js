import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(
    // TODO currently sending the whole state, look into
    // only sending the relevant subset or a diff
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    // TODO should normally add some form of authentication here
    // so not anyone can send any action to be dispatch the the store
    socket.on('action', store.dispatch.bind(store));
  });

}
