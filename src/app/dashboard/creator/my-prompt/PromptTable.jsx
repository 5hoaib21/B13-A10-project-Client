import { DeletePrompt } from "@/components/DeletePrompt";
import { EditPrompt } from "@/components/EditPrompt";
import { Table, Pagination } from "@heroui/react"; // Button, toast বাদ দেওয়া হয়েছে
import Link from "next/link";

export default function MyPromptTable({ promptsData }) {
  const prompts = promptsData?.data || [];
  const page = promptsData?.page;
  const totalPages = promptsData?.totalPages || 0;
  
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
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
              <Table.Row key={prompt._id || index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{prompt?.title}</Table.Cell>
                <Table.Cell>{prompt?.aiTool}</Table.Cell>
                <Table.Cell>{prompt?.visibility}</Table.Cell>
                <Table.Cell>{prompt?.status}</Table.Cell>
                <Table.Cell>{prompt?.copyCount || 0}</Table.Cell>
                <Table.Cell>{prompt?.ratingCount || 0}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <EditPrompt promptId={prompt._id} />

                  {/* ক্লায়েন্ট কম্পোনেন্টে আইডি সুন্দরভাবে পাস হচ্ছে */}
                  <DeletePrompt promptId={prompt._id} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      {/* Pagination Part (যা আছে তাই থাকবে) */}
      <Table.Footer>
        <Pagination size="sm">
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous isDisabled={page === 1}>
                <Link className="flex gap-2" href={`/dashboard/creator/my-prompt?page=${page - 1}`}>
                  <Pagination.PreviousIcon /> Prev
                </Link>
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) => (
              <Pagination.Item key={p}>
                <Link href={`/dashboard/creator/my-prompt?page=${p}`}>
                  <Pagination.Link isActive={p === page}>{p}</Pagination.Link>
                </Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next isDisabled={page === totalPages}>
                <Link className="flex gap-2" href={`/dashboard/creator/my-prompt?page=${page + 1}`}>
                  Next <Pagination.NextIcon />
                </Link>
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  );
}