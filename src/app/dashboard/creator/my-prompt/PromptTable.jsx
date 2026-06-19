import { Table, Button, Pagination } from "@heroui/react";
import { Delete, Edit } from "lucide-react";
import Link from "next/link";

export default function MyPromptTable({ promptsData }) {
    const prompts = promptsData?.data;
    const page = promptsData?.page;
    const pages = [];
    const totalPages = promptsData?.totalPages;
    for(let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    
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
                  <Button variant="outline" size="sm">
                    <Edit />
                  </Button>
                  <Button variant="danger-soft" size="sm">
                    <Delete />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      <Table.Footer>
        <Pagination size="sm">
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous isDisabled={page === 1}>
               <Link className="flex gap-2" href={`/dashboard/creator/my-prompt?page=${page - 1}`}>
                 <Pagination.PreviousIcon />
                Prev
               </Link>
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) => (
              <Pagination.Item key={p}>
              <Link 
              href={`/dashboard/creator/my-prompt?page=${p}`}>
              <Pagination.Link 
              
              isActive={p === page}>
              {p}
              </Pagination.Link>
              </Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next isDisabled={page === totalPages}>
              
                <Link className="flex gap-2" href={`/dashboard/creator/my-prompt?page=${page + 1}`}>
                    Next
                <Pagination.NextIcon />
                </Link>
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  );
}
