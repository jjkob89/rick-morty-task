const Tooltip = ({ text }: { text: string }) => {
    return (
        <div className="tooltip">
            <div className="container"> {text}</div>
        </div>
    );
};

export default Tooltip;
