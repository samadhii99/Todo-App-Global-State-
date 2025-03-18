import React from "react";
import { Space, Button, Radio, Select } from "antd";
import {
  TableOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { undo, redo } from "../redux/todoSlice";

interface ActionBarProps {
  viewMode: "card" | "table";
  setViewMode: React.Dispatch<React.SetStateAction<"card" | "table">>;
  priorityFilter: string | null;
  setPriorityFilter: React.Dispatch<React.SetStateAction<string | null>>;
  onShowFullTable: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({
  viewMode,
  setViewMode,
  priorityFilter,
  setPriorityFilter,
  onShowFullTable,
}) => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.todoState.history);

  // Check if we can undo or redo
  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "16px",
      }}
    >
      <Space>
        <Radio.Group
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
        >
          <Radio.Button value="card">
            <AppstoreOutlined /> Cards
          </Radio.Button>
          <Radio.Button value="table">
            <UnorderedListOutlined /> List
          </Radio.Button>
        </Radio.Group>

        <Select
          placeholder="Filter by priority"
          style={{ width: 150 }}
          allowClear
          value={priorityFilter}
          onChange={(value) => setPriorityFilter(value)}
          options={[
            { value: "high", label: "High Priority" },
            { value: "medium", label: "Medium Priority" },
            { value: "low", label: "Low Priority" },
          ]}
        />

        <Button
          icon={<UndoOutlined />}
          onClick={() => dispatch(undo())}
          disabled={!canUndo}
          title="Undo"
        >
          Undo
        </Button>
        <Button
          icon={<RedoOutlined />}
          onClick={() => dispatch(redo())}
          disabled={!canRedo}
          title="Redo"
        >
          Redo
        </Button>
      </Space>

      <Button type="primary" icon={<TableOutlined />} onClick={onShowFullTable}>
        Full Table View
      </Button>
    </div>
  );
};

export default ActionBar;
