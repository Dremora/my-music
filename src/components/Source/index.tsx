import { type ChangeEvent, memo, useCallback } from "react";

import { Button } from "components/Button";
import { FormField } from "components/FormField";
import { Input } from "components/Input";
import { Select } from "components/Select";
import { Text } from "components/Text";
import {
  type Format,
  type Location,
} from "generated/AlbumFormFragment.graphql";
import { formatInteger, parseInteger, parseOptionalString } from "utils";

import { hrStyle, titleStyle } from "./styles.css";
import { parseMbid } from "./utils";

const locations: { id: Location; label: string }[] = [
  { id: "APPLE_MUSIC", label: "Apple Music" },
  { id: "GOOGLE_MUSIC", label: "Google Music" },
  { id: "SPOTIFY", label: "Spotify" },
  { id: "FOOBAR2000", label: "foobar2000" },
];

const formats: { id: Format; label: string }[] = [
  { id: "MP3", label: "Lossy (MP3)" },
  { id: "MPC", label: "Lossy (MPC)" },
  { id: "WMA", label: "Lossy (WMA)" },
  { id: "TAK", label: "Lossless (TAK)" },
  { id: "APE", label: "Lossless (APE)" },
  { id: "FLAC", label: "Lossless (FLAC)" },
  { id: "MIXED", label: "Mixed" },
];

export type SourceData = {
  readonly id?: string;
  readonly location: Location;
  readonly accurateRip: string | null;
  readonly comments: string | null;
  readonly cueIssues: string | null;
  readonly discs: number | null;
  readonly download: string | null;
  readonly edition: string | null;
  readonly format: Format | null;
  readonly mbid: string | null;
  readonly tagIssues: string | null;
};

type SourceProps = {
  readonly disabled: boolean;
  readonly index: number;
  readonly onRemove: (index: number) => void;
  readonly onUpdate: (index: number, source: Readonly<SourceData>) => void;
  readonly source: SourceData;
};

export const Source = memo(function Source({
  disabled,
  index,
  onRemove,
  onUpdate,
  source,
}: SourceProps) {
  const remove = useCallback(() => {
    onRemove(index);
  }, [index, onRemove]);

  const onLocationChange = useCallback(
    (value: Location) => {
      onUpdate(index, { ...source, location: value });
    },
    [index, onUpdate, source],
  );

  const onFormatChange = useCallback(
    (value: Format) => {
      onUpdate(index, { ...source, format: value });
    },
    [index, onUpdate, source],
  );

  const onEditionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdate(index, {
        ...source,
        edition: parseOptionalString(e.target.value),
      });
    },
    [index, onUpdate, source],
  );

  const onCommentsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdate(index, {
        ...source,
        comments: parseOptionalString(e.target.value),
      });
    },
    [index, onUpdate, source],
  );

  const onMbidChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdate(index, {
        ...source,
        mbid: parseMbid(e.target.value),
      });
    },
    [index, onUpdate, source],
  );

  const onTagIssuesChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdate(index, {
        ...source,
        tagIssues: parseOptionalString(e.target.value),
      });
    },
    [index, onUpdate, source],
  );

  const onAccurateRipChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdate(index, {
        ...source,
        accurateRip: parseOptionalString(e.target.value),
      });
    },
    [index, onUpdate, source],
  );

  const onCueIssuesChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdate(index, {
        ...source,
        cueIssues: parseOptionalString(e.target.value),
      });
    },
    [index, onUpdate, source],
  );

  const onDownloadChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdate(index, {
        ...source,
        download: parseOptionalString(e.target.value),
      });
    },
    [index, onUpdate, source],
  );

  const onDiscsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdate(index, {
        ...source,
        discs: parseInteger(e.target.value),
      });
    },
    [index, onUpdate, source],
  );

  return (
    <>
      <hr className={hrStyle} />
      <div className={titleStyle}>
        <Text color="grey" size="medium" weight="bold">
          Source {index + 1}
        </Text>
        <Button disabled={disabled} onClick={remove} size="small">
          Delete source
        </Button>
      </div>
      <FormField label="Location">
        <Select<Location>
          disabled={disabled}
          onChange={onLocationChange}
          value={source.location}
        >
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.label}
            </option>
          ))}
        </Select>
      </FormField>
      <FormField label="MBID">
        <Input
          disabled={disabled}
          onChange={onMbidChange}
          value={source.mbid ?? ""}
        />
      </FormField>
      <FormField label="Comments">
        <Input
          disabled={disabled}
          onChange={onCommentsChange}
          value={source.comments ?? ""}
        />
      </FormField>
      {source.location !== "SPOTIFY" && (
        <FormField label="Tag issues">
          <Input
            disabled={disabled}
            onChange={onTagIssuesChange}
            value={source.tagIssues ?? ""}
          />
        </FormField>
      )}
      {source.location === "FOOBAR2000" && (
        <>
          <FormField label="Accurate rip">
            <Input
              disabled={disabled}
              onChange={onAccurateRipChange}
              value={source.accurateRip ?? ""}
            />
          </FormField>
          <FormField label="Cue issues">
            <Input
              disabled={disabled}
              onChange={onCueIssuesChange}
              value={source.cueIssues ?? ""}
            />
          </FormField>
          <FormField label="Discs">
            <Input
              disabled={disabled}
              onChange={onDiscsChange}
              value={formatInteger(source.discs ?? null)}
            />
          </FormField>
          <FormField label="Download">
            <Input
              disabled={disabled}
              onChange={onDownloadChange}
              value={source.download ?? ""}
            />
          </FormField>
          <FormField label="Edition">
            <Input
              disabled={disabled}
              onChange={onEditionChange}
              value={source.edition ?? ""}
            />
          </FormField>
          <FormField label="Format">
            <Select
              disabled={disabled}
              onChange={onFormatChange}
              value={source.format ?? null}
            >
              {formats.map((format) => (
                <option key={format.id} value={format.id}>
                  {format.label}
                </option>
              ))}
            </Select>
          </FormField>
        </>
      )}
    </>
  );
});
