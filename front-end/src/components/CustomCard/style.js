import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 220,
    maxHeight: 433,
    position: "relative",
    borderRadius: 12,
  },
  buttonSpace: {
    position: "absolute",
    zIndex: 1,
    top: "22px",
    left: "22px",
    width: "48px",
    height: "48px",
    backgroundColor: "#FF505F",
    borderRadius: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",

    "& svg": {
      margin: 0
    }
  },
  image: {
    width: "100%",
    height: 100,
    paddingTop: '56.25%', // 16:9
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
  },
  nome: {
    fontSize: "20px",
    color: "#575757",
    fontWeight: "bold",
    marginTop: 5,
  },
  descricao: {
    fontSize: "14px",
    color: "#222222",
    marginBottom: 20,
    letterSpacing: "0.4px"
  },
  estoque: {
    fontSize: "14px",
    color: "#656565",
    letterSpacing: "1px",
  },
  preco: {
    fontSize: "15px",
    color: "#000000",
    opacity: 0.7,
    fontWeight: "bold"
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: "5px 0",
  }
}));

export default useStyles;