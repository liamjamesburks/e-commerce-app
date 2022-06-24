import {BaseButton, GoogleButton, InvertedButton, ButtonIcon, GoogleButtonIcon} from "./button.style";

export const BUTTON_TYPE_CLASSES = {
    'default': 'default-button',
    'google': 'google-button',
    'inverted': 'inverted-button'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
    return ({
        [BUTTON_TYPE_CLASSES.default]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);
}

export const Button = ({ buttonType, children, ...kwargs }) => {
    const CustomButton = getButton(buttonType);

    return (
        <div>
            <CustomButton {...kwargs}>
                { (buttonType === 'google-button') && (
                    <GoogleButtonIcon />
                )}
                { children }
            </CustomButton>
        </div>
    )
}

export default Button;