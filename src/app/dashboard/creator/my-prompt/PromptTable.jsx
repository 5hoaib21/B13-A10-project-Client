import {Table, Button} from "@heroui/react";
import { Delete, Edit } from "lucide-react";

export default function MyPromptTable({prompts}) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>#</Table.Column>
            <Table.Column isRowHeader>Title</Table.Column>
            <Table.Column>Ai Engine</Table.Column>
            <Table.Column>Visibility</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Copies</Table.Column>
            <Table.Column>Rating</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {prompts.map((prompt, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{prompt?.title}</Table.Cell>
                <Table.Cell>{prompt?.aiTool}</Table.Cell>
                <Table.Cell>{prompt?.visibility}</Table.Cell>
                <Table.Cell>{prompt?.status}</Table.Cell>
                <Table.Cell>{prompt?.copies || 0}</Table.Cell>
                <Table.Cell>{prompt?.rating || 0}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button variant="outline" size="sm"><Edit/></Button>
                  <Button variant="danger-soft" size="sm"><Delete/></Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
