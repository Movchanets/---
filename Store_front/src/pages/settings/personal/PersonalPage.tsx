import { APP_ENV } from "../../../env";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IUserEdit } from "../../../store/auth/types";
import { useFormik } from "formik";
import { EditUserValidatorSchema } from "../../../store/auth/Validator";
import { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import { toast } from "react-toastify";
import default_image from "../../../assets/default-profile-icon-32.jpg";
import ImageCropper from "../../../components/common/ImageCropper";
import classNames from "classnames";
import styles from "./index.module.scss";
import ServiceResponse from "../../../ServiceResponse";
import http from "../../../http_common";

const PersonalPage = () => {
  const { user } = useTypedSelector((state) => state.login);
  const { EditMyDetails } = useActions();

  useEffect(() => {
    setFieldValue("name", user?.firstName);
    setFieldValue("surname", user?.lastName);
    setFieldValue("email", user?.email);
  }, [user?.email, user?.firstName, user?.lastName]);

  const onForgotPassClickHandle = async () => {
    try {
      await http.post<ServiceResponse<string>>(`api/Account/forgetPassword`, null, {
        params: { email: user?.email },
      });

      toast.success("We just sent a verification link to your email");
    } catch (error: any) {
      console.log("ERROR", error.response.data.message);
    }
  };

  const onHandleImage = (image: Array<File>) => {
    setFieldValue("image", image.at(0));
  };

  const editUserSubmitHandle = async (model: IUserEdit) => {
    console.log("model: ", model);
    try {
      await EditMyDetails(model);
      toast.success("Your details was successfully updated");
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  // formik
  const initialValues: IUserEdit = {
    name: "",
    surname: "",
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: editUserSubmitHandle,
    validationSchema: EditUserValidatorSchema,
  });

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
  } = formik;

  const imageUrl = values.image
    ? URL.createObjectURL(values.image)
    : user?.image
    ? APP_ENV.REMOTE_HOST_IMAGE_URL + user?.image
    : default_image;

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.header}>
                <span>
                  <h2 className={styles.header_title}>Personal details</h2>
                  <p className={styles.header_subtitle}>
                    Update your info and find out how it’s used.
                  </p>
                </span>
                <ImageCropper
                  id="upload"
                  handleImagesFunc={onHandleImage}
                  cropeprOptions={{
                    viewMode: 1,
                    autoCropArea: 1,
                    aspectRatio: 1,
                    minCropBoxWidth: 40,
                    minCropBoxHeight: 40,
                  }}
                >
                  <picture>
                    <img src={imageUrl} alt="user" className={styles.user_img} />
                  </picture>
                </ImageCropper>
              </div>

              {/* fields  */}
              <div className={styles.body}>
                {/* Name  */}
                <div className={styles.field}>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={classNames({
                      [styles.error]: errors.name && touched.name,
                    })}
                  />
                  <span className={styles.error_section}>
                    {touched.name && errors.name}
                  </span>
                </div>

                {/* Surname  */}
                <div className={styles.field}>
                  <label htmlFor="surname">Surname</label>
                  <input
                    id="surname"
                    type="text"
                    name="surname"
                    placeholder="Enter your surname"
                    value={values.surname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={classNames({
                      [styles.error]: errors.surname && touched.surname,
                    })}
                  />
                  <span className={styles.error_section}>
                    {touched.surname && errors.surname}
                  </span>
                </div>

                {/* Email  */}
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={classNames({
                      [styles.error]: errors.email && touched.email,
                    })}
                  />
                  <span className={styles.error_section}>
                    {touched.email && errors.email}
                  </span>
                </div>

                {/* buttons  */}
                <div className={styles.buttons}>
                  <button
                    className={styles.forgot_pass_btn}
                    onClick={() => onForgotPassClickHandle()}
                    type="button"
                  >
                    Forgot password?
                  </button>
                  <button
                    type="submit"
                    className={styles.submit_btn}
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalPage;
