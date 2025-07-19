import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { registerValidationSchema } from '../../utils/validation';
import { RegisterFormValues } from '../../types/auth';
import { Colors } from '../../constants/Colors';

export default function RegisterScreen() {
    const [isLoading, setIsLoading] = useState(false);

    const initialValues: RegisterFormValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const handleRegister = async (values: RegisterFormValues) => {
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Register attempt:', values);

            // Navigate to main app after successful registration
            router.replace('/(tabs)');

        } catch (error) {
            console.error('Register error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <StatusBar style="dark" />
            <LinearGradient
                colors={['#F8F9FA', '#E8EAED']}
                style={styles.gradient}
            >
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView
                        style={styles.keyboardAvoid}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.logo}>CPRG</Text>
                                <Text style={styles.subtitle}>Create your account</Text>
                            </View>

                            {/* Form Container */}
                            <View style={styles.formContainer}>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={registerValidationSchema}
                                    onSubmit={handleRegister}
                                >
                                    {({
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        values,
                                        errors,
                                        touched,
                                        isValid,
                                        dirty,
                                    }) => (
                                        <>
                                            <View style={styles.nameRow}>
                                                <Input
                                                    placeholder="First Name"
                                                    value={values.firstName}
                                                    onChangeText={handleChange('firstName')}
                                                    onBlur={handleBlur('firstName')}
                                                    error={touched.firstName && errors.firstName ? errors.firstName : undefined}
                                                    autoCapitalize="words"
                                                    leftIcon="person-outline"
                                                    style={styles.nameInput}
                                                />
                                                <Input
                                                    placeholder="Last Name"
                                                    value={values.lastName}
                                                    onChangeText={handleChange('lastName')}
                                                    onBlur={handleBlur('lastName')}
                                                    error={touched.lastName && errors.lastName ? errors.lastName : undefined}
                                                    autoCapitalize="words"
                                                    style={styles.nameInput}
                                                />
                                            </View>

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
                                                autoComplete="new-password"
                                                textContentType="newPassword"
                                                leftIcon="lock-closed-outline"
                                            />

                                            <Input
                                                placeholder="Confirm Password"
                                                value={values.confirmPassword}
                                                onChangeText={handleChange('confirmPassword')}
                                                onBlur={handleBlur('confirmPassword')}
                                                error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                                                isPassword
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                autoComplete="new-password"
                                                textContentType="newPassword"
                                                leftIcon="lock-closed-outline"
                                            />

                                            <Button
                                                title="Create Account"
                                                onPress={() => handleSubmit()}
                                                isLoading={isLoading}
                                                disabled={!isValid || !dirty}
                                                fullWidth
                                                size="large"
                                                style={styles.createButton}
                                            />
                                        </>
                                    )}
                                </Formik>
                            </View>

                            {/* Footer */}
                            <View style={styles.footer}>
                                <Link href="/(auth)/login" asChild>
                                    <TouchableOpacity style={styles.loginContainer}>
                                        <Text style={styles.loginText}>
                                            Already have an account? <Text style={styles.loginLink}>Log in</Text>
                                        </Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        fontSize: 48,
        fontWeight: '300',
        color: Colors.text,
        letterSpacing: -1,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        color: Colors.textSecondary,
        textAlign: 'center',
        fontWeight: '400',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    nameRow: {
        flexDirection: 'row',
        gap: 12,
    },
    nameInput: {
        flex: 1,
    },
    createButton: {
        marginTop: 8,
    },
    footer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    loginContainer: {
        padding: 16,
    },
    loginText: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    loginLink: {
        color: Colors.primary,
        fontWeight: '500',
    },
});