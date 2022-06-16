import './form-input.style.scss';

const FormInput = ({ label, ...kwargs }) => {
    return (
        <div className="group">
            <input className="form-input" {...kwargs} />
            {
                label && (
                    <label className={`${kwargs.value.length ? 'shrink' : ''} form-input-label`}>{ label }</label>
                )
            }

        </div>
    )
}

export default FormInput;
