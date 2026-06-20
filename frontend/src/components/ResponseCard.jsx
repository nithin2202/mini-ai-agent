function ResponseCard({ response }) {

  return (
    <div className="card">

      <h2>Response</h2>

      <p>
        <strong>Route:</strong>
        {" "}
        {response.route}
      </p>

      <p>
        <strong>Cached:</strong>
        {" "}
        {response.cached
          ? "Yes"
          : "No"}
      </p>

      <div className="answer">
        {response.answer}
      </div>

    </div>
  );
}

export default ResponseCard;