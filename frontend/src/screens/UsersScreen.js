import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import {
  Table,
  TableBody,
  TableCell,
  CircularProgress,
  TableHead,
  TableRow,
  Container,
  Box,
  Alert,
  Button,
} from "@mui/material";

export default function UsersScreen() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error } = userList;
  const { users } = userList.users || [];

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <Container>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ marginTop: "30px" }}>
          {error}
        </Alert>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Orders</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}
