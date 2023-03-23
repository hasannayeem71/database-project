import { Button, ScrollArea, Table } from "@mantine/core";
import { IconTrash, IconTools } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import EditUser from "./EditUser";

const fetcher = () => {
  return axios.get(`http://localhost:5000/userinfo`);
};
const ShowInfo = () => {

  const [opened, setOpened] = useState(false);
  const [currentSelection, setCurrentSelection] = useState({});
  const { data } = useQuery(["userinfo"], fetcher);
  const queryClient = useQueryClient();

  const handleDelete = (data) => {
    return axios
      .delete(`http://localhost:5000/userinfo/${data}`)

  };
  const handleEdit = async (row) => {
    await setCurrentSelection(row);
    await setOpened(true);
    // console.log(row)
  }




  const { mutate } = useMutation(handleDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries("userinfo");

    },
    onError: (error) => {
      queryClient.invalidateQueries("userinfo");
    },
  });



  const rows = data?.data?.map((row) => {
    return (
      <tr key={row.user_id}>
        <td>{row.firstName}</td>
        <td>{row.lastName}</td>
        <td>{row.email}</td>
        <td>{row.bloodGroup}</td>
        <td>{row.age}</td>
        <td>{row.gender}</td>
        <td>{row.phone}</td>
        <td>{row.address}</td>
        <td>{row.city}</td>
        <td>{row.country}</td>
        <td>{row.appointmentDate}</td>
        <td>{row.releseDate}</td>
        <td style={{ display: 'flex' }}>
          <Button
            leftIcon={<IconTools color="blue" />}
            onClick={() => {
              handleEdit(row);
            }}
            variant="white"
          />
          <Button
            leftIcon={<IconTrash color="red" />}
            onClick={() => {
              mutate(row.user_id);
            }}
            variant="white"
          />
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <EditUser setOpened={setOpened} opened={opened} currentSelection={currentSelection} />
      <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
        <thead>
          <tr >
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Blood Group</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Appointment Date</th>
            <th>Relese Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default ShowInfo;
