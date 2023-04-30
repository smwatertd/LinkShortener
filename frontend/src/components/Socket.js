const Socket = ({socket}) => {
  return (
    <div>
      <hr/>
      <div>full url: {socket.fullUrl}</div><br/>
      <div>short url: {socket.shortUrl}</div><br/>
      <div>created at: {socket.createdAt}</div><br/>
      <div>views: {socket.views}</div><br/>
    </div>
  );
};

export { Socket };
