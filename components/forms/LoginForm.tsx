import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { loginValidationSchema } from '../../utils/validation';
import { LoginFormValues } from '../../types/auth';

interface LoginFormProps {
    onSubmit: (values: LoginFormValues) => Promise<void>;
    isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    onSubmit,
    isLoading = false,
}) => {
    const initialValues: LoginFormValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: LoginFormValues) => {
        try {
            await onSubmit(values);
        } catch (error) {
            Alert.alert(
                'Login Failed',
                'Please check your credentials and try again.',
                [{ text: 'OK' }]
            );
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit: formikSubmit,
                values,
                errors,
                touched,
                isValid,
                dirty,
            }) => (
                <View style={styles.container}>
                    <Input
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={touched.email && errors.email ? errors.email : undefined}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        leftIcon="mail-outline"
                    />

                    <Input
                        placeholder="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={touched.password && errors.password ? errors.password : undefined}
                        isPassword
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="current-password"
                        textContentType="password"
                        leftIcon="lock-closed-outline"
                    />

                    <Button
                        title="Log in"
                        onPress={() => formikSubmit()}
                        isLoading={isLoading}
                        disabled={!isValid || !dirty}
                        fullWidth
                        size="large"
                        style={styles.loginButton}
                    />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    loginButton: {
        marginTop: 8,
    },
});