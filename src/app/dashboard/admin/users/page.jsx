"use client";

import { useEffect, useState } from "react";
import { Table, Button, Chip, Spinner } from "@heroui/react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleToggleBlock = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Active" ? "Blocked" : "Active";

    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? { ...user, status: newStatus }
            : user
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#0B0B0F] text-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Manage Users
        </h1>
        <p className="text-gray-400 mt-2">
          {users.length} registered users
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Users management table">
              <Table.Header>
                <Table.Column isRowHeader>
                  USER
                </Table.Column>
                <Table.Column>EMAIL</Table.Column>
                <Table.Column>ROLE</Table.Column>
                <Table.Column>STATUS</Table.Column>
                <Table.Column>ACTIONS</Table.Column>
              </Table.Header>

              <Table.Body>
                {users.length > 0 ? (
                  users.map((user) => (
                    <Table.Row
                      key={user._id}
                      id={user._id}
                    >
                      <Table.Cell>
                        <div>
                          <p className="font-medium">
                            {user.name}
                          </p>
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        {user.email}
                      </Table.Cell>

                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="flat"
                        >
                          {user.role}
                        </Chip>
                      </Table.Cell>

                      <Table.Cell>
                        <Chip
                          color={
                            user.status === "Active"
                              ? "success"
                              : "danger"
                          }
                          size="sm"
                        >
                          {user.status}
                        </Chip>
                      </Table.Cell>

                      <Table.Cell>
                        <Button
                          size="sm"
                          color={
                            user.status === "Active"
                              ? "danger"
                              : "success"
                          }
                          variant="flat"
                          onPress={() =>
                            handleToggleBlock(
                              user._id,
                              user.status
                            )
                          }
                        >
                          {user.status === "Active"
                            ? "Unblock"
                            : "Block"}
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row id="empty-row">
                    <Table.Cell>
                      No users found
                    </Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>

          <Table.Footer>
            <div className="p-4 text-sm text-gray-400">
              Total registered users: {users.length}
            </div>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}