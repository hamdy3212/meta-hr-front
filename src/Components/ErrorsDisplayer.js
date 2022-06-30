const ErrorsDisplayer = ({ errors }) => {
  const marginBottomFix = errors.length > 1 ? "-6px" : "0px";
  if (errors !== null) {
    return (
      <div
        style={{
          color: "red",
          fontFamily: "Arial",
          marginBottom: marginBottomFix,
        }}
      >
        {errors.map((err,index) => (
          <p key={index} style={{ marginBottom: "6px" }}>
            {err}
            <br />
          </p>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default ErrorsDisplayer;
