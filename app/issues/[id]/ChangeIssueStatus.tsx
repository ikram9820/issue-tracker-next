"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const ChangeIssueStatus = ({ issue }: { issue: Issue }) => {
  const statuses = Object.values(Status);
  const router = useRouter();
  const changeIssueStatus = async (status: string) => {
    await axios
      .patch("/api/issues/" + issue.id, {
        status: status,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
    router.refresh();
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={changeIssueStatus}
      >
        <Select.Trigger placeholder="Status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Statuses.</Select.Label>
            {statuses?.map((status) => (
              <Select.Item key={status} value={status}>
                {status}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default ChangeIssueStatus;
