import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { profileValidationSchema } from '../../utils/validation';
import { ProfileFormValues } from '../../types/auth';
import { Colors } from '../../constants/Colors';

export default function ProfileScreen() {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock current user data
    const currentProfile: ProfileFormValues = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
        dateOfBirth: '1990-01-15',
        bio: 'Software developer passionate about mobile applications and user experience.',
    };

    const handleSaveProfile = async (values: ProfileFormValues) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Profile updated:', values);
            
            Alert.alert(
                'Success',
                'Your profile has been updated successfully!',
                [{ text: 'OK', onPress: () => setIsEditing(false) }]
            );
        } catch (error) {
            console.error('Profile update error:', error);
            Alert.alert(
                'Error',
                'Failed to update profile. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                        router.replace('/(auth)/login');
                    },
                },
            ]
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!isEditing) {
        // Profile View Mode
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Profile</Text>
                        <Text style={styles.subtitle}>
                            Welcome to your CPRG profile
                        </Text>
                    </View>

                    <View style={styles.profileCard}>
                        <View style={styles.profileField}>
                            <Text style={styles.fieldLabel}>Name</Text>
                            <Text style={styles.fieldValue}>
                                {currentProfile.firstName} {currentProfile.lastName}
                            </Text>
                        </View>

                        <View style={styles.profileField}>
                            <Text style={styles.fieldLabel}>Email</Text>
                            <Text style={styles.fieldValue}>{currentProfile.email}</Text>
                        </View>

                        <View style={styles.profileField}>
                            <Text style={styles.fieldLabel}>Phone</Text>
                            <Text style={styles.fieldValue}>{currentProfile.phoneNumber}</Text>
                        </View>

                        <View style={styles.profileField}>
                            <Text style={styles.fieldLabel}>Date of Birth</Text>
                            <Text style={styles.fieldValue}>
                                {formatDate(currentProfile.dateOfBirth)}
                            </Text>
                        </View>

                        <View style={styles.profileField}>
                            <Text style={styles.fieldLabel}>Bio</Text>
                            <Text style={styles.fieldValue}>{currentProfile.bio}</Text>
                        </View>
                    </View>

                    <View style={styles.actions}>
                        <Button
                            title="Edit Profile"
                            onPress={() => setIsEditing(true)}
                            fullWidth
                            style={styles.editButton}
                        />
                        
                        <Button
                            title="Logout"
                            variant="outline"
                            onPress={handleLogout}
                            fullWidth
                            style={styles.logoutButton}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Profile Edit Mode
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Edit Profile</Text>
                    <Text style={styles.subtitle}>
                        Update your personal information
                    </Text>
                </View>

                <Formik
                    initialValues={currentProfile}
                    validationSchema={profileValidationSchema}
                    onSubmit={handleSaveProfile}
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
                        <View style={styles.formContainer}>
                            <Input
                                placeholder="First Name"
                                value={values.firstName}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                error={touched.firstName && errors.firstName ? errors.firstName : undefined}
                                autoCapitalize="words"
                                leftIcon="person-outline"
                            />

                            <Input
                                placeholder="Last Name"
                                value={values.lastName}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                error={touched.lastName && errors.lastName ? errors.lastName : undefined}
                                autoCapitalize="words"
                                leftIcon="person-outline"
                            />

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
                                placeholder="Phone Number"
                                value={values.phoneNumber}
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={handleBlur('phoneNumber')}
                                error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
                                keyboardType="phone-pad"
                                leftIcon="call-outline"
                            />

                            <Input
                                placeholder="Date of Birth (YYYY-MM-DD)"
                                value={values.dateOfBirth}
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                error={touched.dateOfBirth && errors.dateOfBirth ? errors.dateOfBirth : undefined}
                                leftIcon="calendar-outline"
                            />

                            <Input
                                placeholder="Bio"
                                value={values.bio}
                                onChangeText={handleChange('bio')}
                                onBlur={handleBlur('bio')}
                                error={touched.bio && errors.bio ? errors.bio : undefined}
                                multiline
                                numberOfLines={4}
                                leftIcon="document-text-outline"
                            />

                            <View style={styles.formActions}>
                                <Button
                                    title="Cancel"
                                    variant="outline"
                                    onPress={() => setIsEditing(false)}
                                    style={styles.cancelButton}
                                />
                                
                                <Button
                                    title="Save Changes"
                                    onPress={() => handleSubmit()}
                                    isLoading={isLoading}
                                    disabled={!isValid || !dirty}
                                    style={styles.saveButton}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    profileCard: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 20,
        marginBottom: 30,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileField: {
        marginBottom: 16,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    fieldValue: {
        fontSize: 16,
        color: Colors.text,
        lineHeight: 22,
    },
    actions: {
        marginTop: 'auto',
    },
    editButton: {
        marginBottom: 12,
    },
    logoutButton: {
        // No additional styles needed
    },
    formContainer: {
        flex: 1,
    },
    formActions: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
    },
    saveButton: {
        flex: 1,
    },
});