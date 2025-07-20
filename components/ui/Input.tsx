import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    isPassword?: boolean;
    leftIcon?: keyof typeof Ionicons.glyphMap;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    isPassword = false,
    leftIcon,
    style,
    multiline,
    ...props
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Dynamic container style for multiline inputs
    const containerStyle = [
        styles.inputContainer,
        multiline && styles.inputContainerMultiline,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError,
    ];

    // Dynamic alignment for multiline inputs
    const alignItems = multiline ? 'flex-start' : 'center';

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={[containerStyle, { alignItems }]}>
                {leftIcon && (
                    <Ionicons
                        name={leftIcon}
                        size={20}
                        color={Colors.gray[500]}
                        style={[styles.leftIcon, multiline && styles.leftIconMultiline]}
                    />
                )}

                <TextInput
                    style={[styles.input, multiline && styles.inputMultiline, style]}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholderTextColor={Colors.gray[400]}
                    multiline={multiline}
                    {...props}
                />

                {isPassword && (
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.eyeIcon}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={Colors.gray[500]}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.inputBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.inputBorder,
        paddingHorizontal: 16,
        height: 56,
    },
    inputContainerMultiline: {
        minHeight: 56,
        height: 'auto',
        paddingVertical: 0, // Remove container padding, let input handle it
    },
    inputContainerFocused: {
        borderColor: Colors.inputBorderFocus,
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    inputContainerError: {
        borderColor: Colors.error,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.text,
        paddingVertical: 0, // Remove default padding
    },
    inputMultiline: {
        textAlignVertical: 'top',
        paddingTop: 18, // Match icon positioning
        paddingBottom: 18,
        lineHeight: 20,
    },
    leftIcon: {
        marginRight: 12,
    },
    leftIconMultiline: {
        marginTop: 18, // Align icon with first line of text in multiline
        alignSelf: 'flex-start',
    },
    eyeIcon: {
        padding: 4,
    },
    errorText: {
        fontSize: 12,
        color: Colors.error,
        marginTop: 4,
        marginLeft: 4,
    },
});