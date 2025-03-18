import React from "react";
import { Card, Row, Col, Statistic, Tooltip, Progress } from "antd";
import { OrderedListOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Todo } from "../types/todo";

interface StatisticsProps {
  todos: Todo[];
}

const Statistics: React.FC<StatisticsProps> = ({ todos }) => {
  // Calculate task statistics
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const totalTasks = todos.length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card size="small" style={{ marginBottom: "16px" }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={8}>
          <Statistic
            title="Tasks"
            value={totalTasks}
            prefix={<OrderedListOutlined />}
          />
        </Col>
        <Col xs={24} sm={8}>
          <Statistic
            title="Completed"
            value={completedTasks}
            prefix={<CheckCircleOutlined />}
            suffix={`/ ${totalTasks}`}
          />
        </Col>
        <Col xs={24} sm={8}>
          <Tooltip title={`${completionPercentage}% complete`}>
            <Progress
              percent={completionPercentage}
              size="small"
              status={completionPercentage === 100 ? "success" : "active"}
            />
          </Tooltip>
        </Col>
      </Row>
    </Card>
  );
};

export default Statistics;
