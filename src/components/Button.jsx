export default function Button({ btnText, btnClassName, btnOnClick }) {
  return (
    <div
      className={btnClassName}
      onClick={() => {
        if (btnOnClick) {
          return btnOnClick();
        }
      }}
    >
      {btnText}
    </div>
  );
}
