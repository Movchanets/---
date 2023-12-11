import classNames from "classnames";
import { TextField, Typography } from "@mui/material";
import { InputHTMLAttributes } from "react";
import "./style.css";
import { green } from "@mui/material/colors";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    type?: "text" | "password" | "email" | "number",
    field: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errors?: string[],
    error?: string | undefined,
    touched?: boolean | undefined

}

const InputGroup: React.FC<InputGroupProps> = ({
    label,
    type = "text",
    field,
    value,
    onChange,
    errors,
    error,
    touched
}) => {
    
    return (
        <>
            <Typography sx={{ mb: 1 }}>{label}</Typography>
            <TextField
                sx={{ width: "100%" }}
                type={type}
                size="small"
                id={field}
                name={field}
                // label={field}
                variant="outlined"
                 value={value}
                onChange={onChange}
                className={classNames({
                    "is-invalid": error || (error && touched)
                })}
                error = {error ? true : false}
            />
            {errors && (
                <div id="validationServerUsernameFeedback" className="invalid-feedback is-invalid-text-color">
                    {errors.map((err, index) => (
                        <span key={index} >{err}</span>
                    ))}
                </div>
            )}
            {(error && touched) && (
                <div id="validationServerUsernameFeedback" className="invalid-feedback is-invalid-text-color" >
                    {error}
                </div>
            )}
            </>
    );
}

export default InputGroup;