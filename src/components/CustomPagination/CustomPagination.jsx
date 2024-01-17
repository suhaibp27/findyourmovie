import "./CustomPagination.css";
import Pagination from "@mui/material/Pagination";
import { red } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    mode: "dark",
  },
});

const CustomPagination = ({ totalPages, setPage }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div className="innerWidth paginationWrapper">
      <div className="paginationContainer">
        <ThemeProvider theme={darkTheme}>
          <Pagination
            count={totalPages}
            hideNextButton
            hidePrevButton
            color="primary"
            sx={{
              "& .MuiPagination-ul li": {
                width: "30px",
                height: "30px",
              },
              // "& .MuiPaginationItem-root": {
              // padding: "0",
              // margin: "0",
              // fontSize: "12px",
              // },
            }}
            onChange={(e) => handlePageChange(e.target.textContent)}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default CustomPagination;
