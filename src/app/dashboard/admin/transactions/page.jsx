"use client";

import { useEffect, useState } from "react";
import { Card, Chip, Spinner, Table } from "@heroui/react";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/payments");
      const data = await res.json();

      setTransactions(
        Array.isArray(data) ? data.reverse() : []
      );
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();

    const interval = setInterval(fetchPayments, 10000);

    return () => clearInterval(interval);
  }, []);

  const totalRevenue = transactions.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Transactions</h1>
        <p className="text-default-500 mt-2">
          Track all payment activities
        </p>
      </div>

      <Card className="mb-8 border border-default-200 bg-content1">
        <div className="p-6 flex items-center gap-4">
          <div className="size-16 rounded-2xl bg-success/10 flex items-center justify-center">
            <span className="text-3xl font-bold text-success">$</span>
          </div>

          <div>
            <h2 className="text-4xl font-bold">
              ${totalRevenue.toFixed(2)}
            </h2>
            <p className="text-default-500">
              Total Revenue
            </p>
          </div>
        </div>
      </Card>

      <Card className="border border-default-200 bg-content1">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Transactions table">
              <Table.Header>
                <Table.Column isRowHeader>
                  USER
                </Table.Column>
                <Table.Column>
                  AMOUNT
                </Table.Column>
                <Table.Column>
                  TRANSACTION ID
                </Table.Column>
                <Table.Column>
                  PAID AT
                </Table.Column>
                <Table.Column>
                  STATUS
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {transactions.length > 0 ? (
                  transactions.map((t) => (
                    <Table.Row
                      key={t._id}
                      id={t._id}
                    >
                      <Table.Cell>
                        <div>
                          <p className="font-medium">
                            {t.name || "Unknown User"}
                          </p>
                          <p className="text-sm text-default-500">
                            {t.email || "N/A"}
                          </p>
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="font-semibold text-success">
                          ${t.amount || "0.00"}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="text-default-500">
                          {t.transactionId ||
                            t.tran_id ||
                            t._id}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        {t.createdAt
                          ? new Date(
                              t.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </Table.Cell>

                      <Table.Cell>
                        <Chip
                          color="success"
                          variant="flat"
                          size="sm"
                        >
                          {t.status || "Completed"}
                        </Chip>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row id="empty">
                    <Table.Cell>
                      No transactions found
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
            <div className="px-4 py-3 text-sm text-default-500">
              Total Transactions: {transactions.length}
            </div>
          </Table.Footer>
        </Table>
      </Card>
    </div>
  );
};

export default TransactionsPage;