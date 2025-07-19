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
import { LinearGradient } from 'expo-linear-gradient';;
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LoginForm } from '../../components/forms/LoginForm';
import { LoginFormValues } from '../../types/auth';
import { Colors } from '../../constants/Colors';

export default function LoginScreen() {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (values: LoginFormValues) => {
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Here you would typically:
            // 1. Call your authentication API
            // 2. Store the auth token securely
            // 3. Update the app's authentication state

            console.log('Login attempt:', values);

            // Navigate to the main app after successful login
            router.replace('/(tabs)');

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        // Navigate to forgot password screen or show modal
        console.log('Forgot password pressed');
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
                                <Text style={styles.subtitle}>
                                    Welcome to your{'\n'}mobile application
                                </Text>
                            </View>

                            {/* Form Container */}
                            <View style={styles.formContainer}>
                                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

                                {/* Forgot Password */}
                                <TouchableOpacity
                                    onPress={handleForgotPassword}
                                    style={styles.forgotPasswordContainer}
                                >
                                    <Text style={styles.forgotPasswordText}>Forgotten?</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Footer */}
                            <View style={styles.footer}>
                                <Link href="/(auth)/register" asChild>
                                    <TouchableOpacity style={styles.createAccountContainer}>
                                        <Text style={styles.createAccountText}>Create account</Text>
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
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 80,
    },
    logo: {
        fontSize: 48,
        fontWeight: '300',
        color: Colors.text,
        letterSpacing: -1,
        marginBottom: 24,
    },
    subtitle: {
        fontSize: 18,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 26,
        fontWeight: '400',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 40,
    },
    forgotPasswordContainer: {
        alignItems: 'center',
        marginTop: 24,
        padding: 8,
    },
    forgotPasswordText: {
        fontSize: 16,
        color: Colors.primary,
        fontWeight: '500',
    },
    footer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    createAccountContainer: {
        padding: 16,
    },
    createAccountText: {
        fontSize: 16,
        color: Colors.primary,
        fontWeight: '500',
    },
});