"use client";

import { useEffect, useState } from "react";
import { Box, Card, Checkbox, Flex, Label, Stack, Text } from "@sanity/ui";
import { set, type ArrayOfObjectsInputProps, type Reference } from "sanity";
import { useClient } from "sanity";

type TechnologyOption = {
  _id: string;
  name: string;
};

function createKey() {
  return Math.random().toString(36).slice(2, 11);
}

export function TechnologiesSelectInput(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange, readOnly } = props;
  const client = useClient({ apiVersion: "2025-01-01" });
  const [technologies, setTechnologies] = useState<TechnologyOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    client
      .fetch<TechnologyOption[]>(
        `*[_type == "technology"] | order(order asc, name asc){ _id, name }`
      )
      .then((items) => {
        if (!cancelled) {
          setTechnologies(items);
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

  const items = (value ?? []) as Reference[];
  const selectedIds = new Set(items.map((item) => item._ref).filter(Boolean));

  const toggleTechnology = (technologyId: string, checked: boolean) => {
    if (readOnly) return;

    const current = items;

    if (checked) {
      if (selectedIds.has(technologyId)) return;
      onChange(
        set([
          ...current,
          {
            _type: "reference",
            _ref: technologyId,
            _key: createKey(),
          },
        ])
      );
      return;
    }

    onChange(set(current.filter((item) => item._ref !== technologyId)));
  };

  return (
    <Stack space={3}>
      <Text size={1} muted>
        Check the technologies used on this project. Add new ones under{" "}
        <strong>Portfolio → Technologies</strong> in the sidebar — not here.
      </Text>
      <Card padding={3} radius={2} shadow={1}>
        {loading && <Text size={1}>Loading technologies…</Text>}
        {!loading && technologies.length === 0 && (
          <Text size={1} style={{ color: "var(--card-badge-caution-fg-color)" }}>
            No technologies yet. Create them under Portfolio → Technologies first.
          </Text>
        )}
        {!loading && technologies.length > 0 && (
          <Stack space={3}>
            {technologies.map((technology) => (
              <Flex key={technology._id} align="center" gap={3}>
                <Box>
                  <Checkbox
                    checked={selectedIds.has(technology._id)}
                    disabled={readOnly}
                    onChange={(event) =>
                      toggleTechnology(technology._id, event.currentTarget.checked)
                    }
                  />
                </Box>
                <Label style={{ cursor: readOnly ? "default" : "pointer" }}>
                  <Text size={1}>{technology.name}</Text>
                </Label>
              </Flex>
            ))}
          </Stack>
        )}
      </Card>
    </Stack>
  );
}
