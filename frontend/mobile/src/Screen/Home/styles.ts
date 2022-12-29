import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomColor: THEME.COLORS.BORDER,
    borderBottomWidth: 1,
  },
  userNameText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.TEXT,
    marginStart: 10,
  },
  content: {
    flex: 1,
  },
  post:{
    borderBottomColor: THEME.COLORS.BORDER,
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  postHeading: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  postUserText: {
    color: THEME.COLORS.TEXT,
    marginStart: 10,
  },
  contentBody: {
    paddingHorizontal: 24,
  },
  contentText: {
    color: THEME.COLORS.TEXT,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  number: {
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
    marginEnd: 24
  },
});
