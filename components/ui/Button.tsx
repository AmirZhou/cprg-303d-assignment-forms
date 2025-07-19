import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacityProps,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Colors } from '../../constants/Colors';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    isLoading?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    size = 'medium',
    isLoading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    style,
    disabled,
    ...props
}) => {
    const getButtonStyle = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            ...styles.button,
            ...styles[`${size}Button`],
            ...(fullWidth && styles.fullWidth),
        };

        switch (variant) {
            case 'primary':
                return { ...baseStyle, ...styles.primaryButton };
            case 'secondary':
                return { ...baseStyle, ...styles.secondaryButton };
            case 'outline':
                return { ...baseStyle, ...styles.outlineButton };
            case 'ghost':
                return { ...baseStyle, ...styles.ghostButton };
            default:
                return baseStyle;
        }
    };

    const getTextStyle = (): TextStyle => {
        const baseStyle: TextStyle = {
            ...styles.buttonText,
            ...styles[`${size}Text`],
        };

        switch (variant) {
            case 'primary':
                return { ...baseStyle, ...styles.primaryText };
            case 'secondary':
                return { ...baseStyle, ...styles.secondaryText };
            case 'outline':
                return { ...baseStyle, ...styles.outlineText };
            case 'ghost':
                return { ...baseStyle, ...styles.ghostText };
            default:
                return baseStyle;
        }
    };

    const isDisabled = disabled || isLoading;

    return (
        <TouchableOpacity
            style={[
                getButtonStyle(),
                isDisabled && styles.disabledButton,
                style,
            ]}
            disabled={isDisabled}
            {...props}
        >
            {leftIcon && !isLoading && leftIcon}

            {isLoading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' ? Colors.white : Colors.primary}
                />
            ) : (
                <Text style={[getTextStyle(), isDisabled && styles.disabledText]}>
                    {title}
                </Text>
            )}

            {rightIcon && !isLoading && rightIcon}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        paddingHorizontal: 24,
    },

    // Size variants
    smallButton: {
        height: 40,
        paddingHorizontal: 16,
    },
    mediumButton: {
        height: 48,
    },
    largeButton: {
        height: 56,
    },

    // Button variants
    primaryButton: {
        backgroundColor: Colors.primary,
    },
    secondaryButton: {
        backgroundColor: Colors.gray[100],
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    ghostButton: {
        backgroundColor: 'transparent',
    },

    // Text styles
    buttonText: {
        fontWeight: '600',
        textAlign: 'center',
    },
    smallText: {
        fontSize: 14,
    },
    mediumText: {
        fontSize: 16,
    },
    largeText: {
        fontSize: 18,
    },

    // Text color variants
    primaryText: {
        color: Colors.white,
    },
    secondaryText: {
        color: Colors.text,
    },
    outlineText: {
        color: Colors.primary,
    },
    ghostText: {
        color: Colors.primary,
    },

    // States
    disabledButton: {
        opacity: 0.5,
    },
    disabledText: {
        opacity: 0.7,
    },

    // Layout
    fullWidth: {
        width: '100%',
    },
});