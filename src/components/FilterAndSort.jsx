// components/FilterAndSort.jsx
'use client';

import { Select, ListBox, Button } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';

const FilterAndSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = params.toString();
    router.push(query ? `/prompts?${query}` : '/prompts');
  };

  const currentCategory = searchParams.get('category') || '';
  const currentAiTool = searchParams.get('aiTool') || '';
  const currentDifficulty = searchParams.get('difficulty') || '';
  const currentSort = searchParams.get('sort') || 'latest';

  return (
    <div className="flex flex-wrap gap-3 my-4">
      <Select
        placeholder="Category"
        selectedKeys={currentCategory ? [currentCategory] : []}
        onSelectionChange={(keys) => updateFilters('category', [...keys][0])}
        className="w-40"
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            <ListBox.Item id="all">All</ListBox.Item>
            <ListBox.Item id="development">Development</ListBox.Item>
            <ListBox.Item id="design">Design</ListBox.Item>
            <ListBox.Item id="marketing">Marketing</ListBox.Item>
            <ListBox.Item id="writing">Writing</ListBox.Item>
            <ListBox.Item id="education">Education</ListBox.Item>
            <ListBox.Item id="business">Business</ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      <Select
        placeholder="AI Tool"
        selectedKeys={currentAiTool ? [currentAiTool] : []}
        onSelectionChange={(keys) => updateFilters('aiTool', [...keys][0])}
        className="w-40"
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            <ListBox.Item id="all">All</ListBox.Item>
            <ListBox.Item id="chatgpt">ChatGPT</ListBox.Item>
            <ListBox.Item id="gemini">Gemini</ListBox.Item>
            <ListBox.Item id="claude">Claude</ListBox.Item>
            <ListBox.Item id="midjourney">Midjourney</ListBox.Item>
            <ListBox.Item id="stable-diffusion">Stable Diffusion</ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      <Select
        placeholder="Difficulty"
        selectedKeys={currentDifficulty ? [currentDifficulty] : []}
        onSelectionChange={(keys) => updateFilters('difficulty', [...keys][0])}
        className="w-40"
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            <ListBox.Item id="all">All</ListBox.Item>
            <ListBox.Item id="Beginner">Beginner</ListBox.Item>
            <ListBox.Item id="Intermediate">Intermediate</ListBox.Item>
            <ListBox.Item id="Pro">Pro</ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      <Select
        placeholder="Sort by"
        selectedKeys={[currentSort]}
        onSelectionChange={(keys) => updateFilters('sort', [...keys][0])}
        className="w-40"
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            <ListBox.Item id="latest">Latest</ListBox.Item>
            <ListBox.Item id="popular">Most Popular</ListBox.Item>
            <ListBox.Item id="copied">Most Copied</ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      {(currentCategory || currentAiTool || currentDifficulty || currentSort !== 'latest') && (
        <Button size="sm" variant="ghost" onPress={() => router.push('/prompts')}>
          Clear All
        </Button>
      )}
    </div>
  );
};

export default FilterAndSort;