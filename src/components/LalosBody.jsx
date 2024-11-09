export default function LalosBody(props) {
    return (
        <div className="work-area" style={{ padding: !props.padding ? 0 : props.padding, height: "100%" }}>
            {props.children}
        </div>
    );
}
