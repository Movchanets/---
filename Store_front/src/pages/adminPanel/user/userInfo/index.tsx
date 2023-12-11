import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserItem } from "../../../../store/users/types";
import { useActions } from "../../../../hooks/useActions";
import * as yup from "yup";
import { useFormik } from "formik";
import InputGroup from "../../../../components/common/InputGroup/InputGroup";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { UserProfileActionType } from "../../../../store/users/userReducers/userProfileReducer/userProfileReducer";
import ImageCropper from "../../../../components/common/ImageCropper";
import http from "../../../../http_common";
import ServiceResponse from "../../../../ServiceResponse";
import { APP_ENV } from "../../../../env";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UserInfo: React.FC = () => {
  const { userId } = useParams();

  const dispatch = useDispatch();
  const { LoadUserProfileData } = useActions();
  const { user } = useTypedSelector((store) => store.userProfile);
  const defaultImage =
    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=996&t=st=1684696819~exp=1684697419~hmac=9bf6801b18a39134314439aaa941a5540bdd0bbee1a4e7e02ff3eebda8ae2695";
  const [urlImage, setUrlImage] = useState<string>("");

  const LoadUserData = async () => {
    try {
      await LoadUserProfileData(Number.parseInt(userId as string));
    } catch (err: any) {
      console.log("Error", err.message);
    }
  };

  const initValues: UserItem = user;
  useEffect(() => {
    LoadUserData();
  }, []);

  const onSubmitFormik = async (values: UserItem) => {
    try {
      values.image = urlImage as string;
      dispatch({
        type: UserProfileActionType.UPDATE_USER_PROFILE_DATA,
        payload: values,
      });

      const temUser: UserItem = values;
      console.log("click supdate btd", temUser);
      http
        .put<ServiceResponse<UserItem>>("/api/User/update", temUser)
        .then((resp) => {
          console.log("server respons", resp);
        });
    } catch (err: any) {}
  };

  const updateSchema = yup.object({
    firstName: yup.string().required("Вкажіть ім'я"),
    lastName: yup.string().required("Вкажіть прізвище"),
    email: yup
      .string()
      .required("Вкажіть електрону адресу")
      .email("Повинна бути валідна пошта"),
    phoneNumber: yup
      .string()
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Шаблон телефону: +380123456789"
      )
      .label(`Phone number`),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initValues,
    onSubmit: onSubmitFormik,
    validationSchema: updateSchema,
  });

  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    formik;

  //Отримує картинки від кроппера
  const onHandleImages = (images: Array<File>) => {
    const reader = new FileReader();
    reader.readAsDataURL(images[0]); //проводимо читання дагого файлу, для отримання base64
    reader.onload = function () {
      //якщо читання успішні
      setUrlImage(reader.result as string); //передаємо результат (base64)
    };
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={3}>
              <Paper sx={{ py: 4 }}>
                <label htmlFor="upload" style={{ width: "100%" }}>
                  <Avatar
                    alt={user.image}
                    src={
                      user.image
                        ? `${APP_ENV.REMOTE_HOST_IMAGE_URL}${user.image}`
                        : defaultImage
                    }
                    sx={{
                      width: { xs: 100, md: 180 },
                      height: { xs: 100, md: 180 },
                      maxWidth: "100%",
                      margin: "auto",
                      marginBottom: 2,
                      cursor:"pointer"
                    }}
                  />
                </label>

                <ImageCropper
                  id="upload"
                  handleImagesFunc={onHandleImages}
                  cropeprOptions={{
                    viewMode: 1,
                    autoCropArea: 1,
                    minCropBoxWidth: 40,
                    minCropBoxHeight: 40,
                  }}
                />
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ fontWeight: "bold", py: 0 }}
                >
                  You name: {values.firstName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", color: "gray" }}
                >
                  Some description
                </Typography>

                <Divider
                  variant="fullWidth"
                  sx={{ fontSize: 16, backgroundColor: "black", my: 1 }}
                />

                <Grid item container>
                  <Grid item xs>
                    <Typography sx={{ textAlign: "center" }}>
                      Some Information
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ textAlign: "center" }}>26 </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={9} sx={{}}>
              <Paper>
                <Typography>Other information for update</Typography>
                <Grid container spacing={3} sx={{ py: 2, px: 2, pb: 5 }}>
                  <Grid item xs={12} md={6}>
                    <InputGroup
                      label="First name"
                      field="firstName"
                      value={values.firstName}
                      error={errors.firstName}
                      touched={touched.firstName}
                      onChange={handleChange}
                    />
                    {/* <Typography sx={{ mb: 1 }} >First name</Typography> */}
                    {/* <TextField 
                  sx={{ width: "100%" }} 
                  size="small" 
                  id="firstName" 
                  name="firstName"
                  // label="Name" 
                  variant="outlined" 
                  value={values.firstName}
                  onChange={handleChange}
                 
                  error={errors.firstName ? true : false}
                  /> */}
                    {/* {errors.firstName && touched.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )} */}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputGroup
                      label="Last name"
                      field="lastName"
                      value={values.lastName}
                      error={errors.lastName}
                      touched={touched.lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputGroup
                      label="Mob. phone"
                      field="phoneNumber"
                      value={values.phoneNumber ?? "0"}
                      error={errors.phoneNumber}
                      touched={touched.phoneNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputGroup
                      label="Email"
                      field="email"
                      value={values.email}
                      error={errors.email}
                      touched={touched.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item sx={{ px: 2 }}>
                    <Button className="secondery" type="submit">
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default UserInfo;
