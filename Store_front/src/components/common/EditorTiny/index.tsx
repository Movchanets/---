import { Editor, IAllProps } from "@tinymce/tinymce-react";
import classNames from "classnames";
import { FC } from "react";
import { config } from "./configTinyMCE";

interface IEditorProps extends IAllProps {
  field: string;
  label?: string;
  error?: string | undefined;
  touched?: boolean | undefined;
}

const EditorTiny: FC<IEditorProps> = ({
  label,
  field,
  error,
  touched,
  ...props
}) => {
  return (
    <div className="mb-3">
      <label
        htmlFor={field}
        className={classNames({ "d-none": !label }, "form-label")}
      >
        {label}
      </label>
      <div
        className={classNames(
          "border border-4 rounded",
          {
            "is-invalid  border-danger": touched && error,
          },
          {
            "is-valid border-success": touched && !error,
          }
        )}
      >
        <Editor
          apiKey="t2jaitu3vx9z1gsu1y2q8vv19tktion5xhz80ssx7w83om8p"
          init={config}
          //outputFormat="html"
          //toolbar="code"
          {...props}
        />
      </div>
      {touched && error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default EditorTiny;
