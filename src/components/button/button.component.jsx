import './button.style.scss';
import { ReactComponent as GoogleIcon } from "../../assets/google_icon.svg";

const BUTTON_TYPE_CLASSES = {
    'default': 'default-button',
    'google': 'google-button',
    'inverted': 'inverted-button'
}

export const Button = ({ buttonType, children, ...kwargs }) => {
    return (
        <div>
            <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...kwargs}>
                { (buttonType === 'google') && (
                    <GoogleIcon className="google-icon"/>
                )}
                { children }
            </button>
        </div>
    )
}

export default Button;