import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        maxWidth: "100%",
        minWidth: 240,
        borderRadius: 10,
        padding: 8,
        backgroundColor: THEME.COLORS.BACKGROUND_900,

    },
    input: {
        marginStart: 12,
        flex: 1,
        color: THEME.COLORS.INPUT,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        placeHolderTextColor: THEME.COLORS.INPUT
    }
})