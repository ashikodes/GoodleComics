import { StyleSheet, Platform } from "react-native";
import { color } from "../../theme"

export default StyleSheet.create({
  activeBar: {
    backgroundColor: color.darkBlue,
    borderRadius: 3,
    height: 8,
  },

  activeFormName: {
    color: color.palette.black,
    fontFamily: Platform.select({
      ios: 'Poppins',
      android: 'Poppins-Regular',
    }),
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },

  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },

  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: color.palette.white,
  },

  errorText: {
    color: color.error,
    fontSize: 14,
  },

  formButton: {
    backgroundColor: color.primaryBlue,
    height: 64,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    marginVertical: 20,
    padding: 14,
  },

  formHeader: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  formName: {
    color: color.gray,
    fontFamily: Platform.select({
      ios: 'Poppins',
      android: 'Poppins-Regular',
    }),
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },

  headerText: {
    color: color.palette.black,
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginBottom: 40,
    marginTop: 60
  },

  textInput: {
    flex: 1,
    color: color.palette.black,
    fontFamily: 'Poppins-Regular',
    fontSize: 18
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.inputBg,
    borderColor: color.inputBorder,
    borderRadius: 11,
    borderWidth: 3,
    height: 60,
    paddingLeft: 20,
    paddingRight: 10
  },

  inputContainer: {
    marginTop: 15,
    position: 'relative',
  },

  inputError: {
    borderColor: color.error,
  },

  inputIcon: {
    height: 35,
    width: 35,
  },

  loader: {
    alignItems: 'center',
    backgroundColor: color.opaque,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 3,
  },

  loadingText: {
    fontSize: 18,
  }
})