"use client";

import { useEffect, useState } from "react";
import { Box, Select, Stack, Text } from "@sanity/ui";
import { set, unset, type ObjectInputProps, type Reference } from "sanity";
import { useClient } from "sanity";

type CategoryOption = {
  _id: string;
  title: string;
};

export function CategorySelectInput(props: ObjectInputProps<Reference>) {
  const { value, onChange, readOnly } = props;
  const client = useClient({ apiVersion: "2025-01-01" });
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    client
      .fetch<CategoryOption[]>(
        `*[_type == "projectCategory"] | order(order asc, title asc){ _id, title }`
      )
      .then((items) => {
        if (!cancelled) {
          setCategories(items);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [client]);

  const selectedId = value?._ref ?? "";

  return (
    <Stack space={3}>
      <Text size={1} muted>
        Select a category from your list. Add new categories under{" "}
        <strong>Portfolio → Project Categories</strong> in the sidebar.
      </Text>
      <Box>
        <Select
          disabled={readOnly || loading}
          value={selectedId}
          onChange={(event) => {
            const nextId = event.currentTarget.value;
            if (!nextId) {
              onChange(unset());
              return;
            }
            onChange(
              set({
                _type: "reference",
                _ref: nextId,
              })
            );
          }}
        >
          <option value="">{loading ? "Loading categories…" : "Select a category…"}</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </Select>
      </Box>
      {!loading && categories.length === 0 && (
        <Text size={1} style={{ color: "var(--card-badge-caution-fg-color)" }}>
          No categories yet. Create one under Portfolio → Project Categories first.
        </Text>
      )}
    </Stack>
  );
}
