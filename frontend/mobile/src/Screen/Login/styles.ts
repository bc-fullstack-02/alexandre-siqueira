import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 48
    },
    logo:{
        width: 100,
        height: 100,
    },
    text: {
        color: THEME.COLORS.TEXT
    }
})