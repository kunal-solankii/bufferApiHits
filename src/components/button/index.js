import './button.css';

export const Button = ({ title, onClick }) => {
    return (
        <button
            className="ui-button"
            onClick={onClick}
            tabIndex={1}
            onKeyDown={(event) => {
                event.preventDefault();
                event.key === 'Enter' && onClick()
            }}
        >
            {title}
        </button>
    )
}