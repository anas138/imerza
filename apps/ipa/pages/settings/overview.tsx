import {
  ActionIcon,
  Center,
  createStyles,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import Header from "../../components/header";
import React, { useEffect, useState } from "react";
import Button from "../../components/common/button";
import { IconCircle, IconPlus, IconUpload } from "@tabler/icons-react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useListState } from "@mantine/hooks";
import SettingsContainer from "../../components/content/container/settings-container";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import ListItemContainer from "../../components/content/container/list-item-container";
import InputText from "../../components/common/input-text";
import SwitchBinary from "../../components/common/switch-binary";
import AddConnection from "../../components/modal/variants/add-connection";
import AddBedroom from "../../components/modal/variants/add-bedroom";
import AddAgentEmail from "../../components/modal/variants/add-agent-email";
import SaveSettings from "../../components/modal/variants/save-settings";
import compareObjects from "../../lib/compare-objects";

const useStyles = createStyles((theme) => ({
  divider: {
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[3],
  },
}));

const Overview = () => {
  /* Start of Test Data, remove when JSON is connected */
  const general = {
    customer: "Biscayne1400",
    projectName: "Biscayne1400",
    projectLocation: "Fort Lauderdale, FL",
    latLong: "41°24'12.2\"N 2°10'26.5\"E",
  };
  const quickToggles = {
    vrButton: false,
    emailButton: true,
    imageScaling: true,
    recordVideo: true,
    viewImage: false,
    watermark: false,
  };
  const paths = {
    assetsPath: "http://localhost:8081/1400biscayne/",
    imagesPath: "http://localhost:8081/1400biscayne/images/",
    videosPath: "http://localhost:8081/1400biscayne/videos/",
    mapsPath: "http://localhost:8081/1400biscayne/maps/",
    generatedPath: "http://shots.imerza.com/1400biscayne",
  };
  const logo = {
    logoPath:
      "https://s3-us-west-2.amazonaws.com/imerzaassets/assets/1400biscayne/logo.png",
  };
  const filters = {
    price: {
      type: "range",
      min: "750000",
      max: "2000000",
    },
    sq: {
      type: "range",
      min: "1400",
      max: "8500",
    },
  };
  const bedrooms = {
    type: "segmented_slider",
    options: ["All", "1", "2", "3", "4"],
  };
  const displays = [
    { label: "Main", data: "http://192.168.256.136:8081" },
    { label: "Secondary", data: "http://192.168.256.13:8081" },
    { label: "Conference Room", data: "http://192.168.256.45:8081" },
    { label: "Local", data: "http://10.1.101.86:8081" },
    { label: "Hotspot", data: "http://192.168.137.1:8081" },
  ];
  const pixelStreams = [
    { label: "Video Wall", data: "http://10.40.201.91:8889" },
    { label: "Conference Room", data: "http://10.40.201.92:8889" },
    { label: "Closing Room", data: "http://10.40.201.95:8889" },
  ];
  const agentEmails = [
    { name: "Gary Dsnail", email: "gDsnail@snailmail.com" },
    { name: "Peter Rabbit", email: "rabbitp@gmail.com" },
  ];
  const code = "";
  /* End of Test Data */

  /* Start of Variable Declarations */
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [openAddBedroom, setOpenAddBedroom] = useState(false);
  const [openAddDisplay, setOpenAddDisplay] = useState(false);
  const [openAddPixelStream, setOpenAddPixelStream] = useState(false);
  const [openAddEmail, setOpenAddEmail] = useState(false);
  const [openSaveSettings, setOpenSaveSettings] = useState(false);

  /* TODO: Connect JSON data here */
  const initialSettings = {
    customer: general.customer,
    projectName: general.projectName,
    projectLocation: general.projectLocation,
    latLong: general.latLong,
    vrButton: quickToggles.vrButton,
    emailButton: quickToggles.emailButton,
    imageScaling: quickToggles.imageScaling,
    recordVideo: quickToggles.recordVideo,
    viewImage: quickToggles.viewImage,
    watermark: quickToggles.watermark,
    logoPath: logo.logoPath,
    assetsPath: paths.assetsPath,
    imagesPath: paths.imagesPath,
    videosPath: paths.videosPath,
    mapsPath: paths.mapsPath,
    generatedPath: paths.generatedPath,
    minPrice: filters.price.min,
    maxPrice: filters.price.max,
    minSq: filters.sq.min,
    maxSq: filters.sq.max,
    bedrooms: bedrooms.options,
    displays: displays,
    pixelStreams: pixelStreams,
    agentEmails: agentEmails,
    code: code,
  };
  const [settings, setSettings] = useState(initialSettings);
  /* End of Variable Declarations */

  /* Start of Handlers */
  const handleLogoSelect = () => {
    document.getElementById("input_file").click();
  };

  const handleChange = (change) => {
    if (change) {
      return <IconCircle size={10} fill={"#FFA94D"} strokeWidth={0} />;
    }
    return;
  };

  const handleField = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };
  /* End of Handlers */

  /* Start of Drag and Drop Kit Logic */
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeBedrooms, setActiveBedrooms] = useState(null);
  const [bedroomsState, bedroomsHandler] = useListState(settings.bedrooms);

  function handleBedroomDragStart(event) {
    setActiveBedrooms(event.active.id);
  }

  function handleBedroomDragEnd(event) {
    const { active, over } = event;

    // if (active.id !== over.id) {
    //   setBedrooms((bedrooms) => {
    //     const indexA = bedrooms.indexOf(active.id);
    //     const indexB = bedrooms.indexOf(over.id);
    //     return arrayMove(bedrooms, indexA, indexB);
    //   });
    // }
    if (active.id !== over.id) {
      const indexA = bedroomsState.indexOf(active.id);
      const indexB = bedroomsState.indexOf(over.id);
      bedroomsHandler.reorder({ from: indexA, to: indexB > -1 ? indexB : 0 });
    }
    setActiveBedrooms(null);
  }

  function handleBedroomDragCancel() {
    setActiveBedrooms(null);
  }

  const [activeDisplay, setActiveDisplay] = useState(null);
  const [displaysState, displaysHandler] = useListState(settings.displays);

  function handleDisplayDragStart(event) {
    setActiveDisplay(event.active.id);
  }

  function handleDisplayDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const indexA = displaysState.indexOf(active.id);
      const indexB = displaysState.indexOf(over.id);
      displaysHandler.reorder({ from: indexA, to: indexB > -1 ? indexB : 0 });
    }
    setActiveDisplay(null);
  }

  function handleDisplayDragCancel() {
    setActiveDisplay(null);
  }

  const [activePixelStream, setActivePixelStream] = useState(null);
  const [pixelStreamsState, pixelStreamsHandler] = useListState(
    settings.pixelStreams
  );

  function handlePixelStreamDragStart(event) {
    setActivePixelStream(event.active.id);
  }

  function handlePixelStreamDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const indexA = pixelStreamsState.indexOf(active.id);
      const indexB = pixelStreamsState.indexOf(over.id);
      pixelStreamsHandler.reorder({
        from: indexA,
        to: indexB > -1 ? indexB : 0,
      });
    }
    setActivePixelStream(null);
  }

  function handlePixelStreamDragCancel() {
    setActivePixelStream(null);
  }

  /* End of DND Kit Logic */

  /* Start of Listeners */
  useEffect(() => {
    setSettings({
      ...settings,
      bedrooms: bedroomsState,
      displays: displaysState,
      pixelStreams: pixelStreamsState,
    });
  }, [bedroomsState, displaysState, pixelStreamsState]);
  /* End of Listeners */

  return (
    <>
      <Header
        name={"Overview"}
        rightSection={
          <>
            {JSON.stringify(settings) !== JSON.stringify(initialSettings) && (
              <Button
                variant={"save"}
                onClick={() => setOpenSaveSettings(true)}
              />
            )}
          </>
        }
      />
      <Flex wrap={"wrap"} gap={"lg"}>
        <SettingsContainer label={"General"} width={400}>
          <Stack spacing={"xs"}>
            <InputText
              name={"customer"}
              label={"Customer"}
              value={settings.customer}
              onChange={handleField}
              rightSection={handleChange(
                general.customer !== settings.customer
              )}
            />
            <InputText
              name={"projectName"}
              label={"Project Name"}
              value={settings.projectName}
              onChange={handleField}
              rightSection={handleChange(
                general.projectName !== settings.projectName
              )}
            />
            <InputText
              name={"projectLocation"}
              label={"Project Location"}
              value={settings.projectLocation}
              onChange={handleField}
              rightSection={handleChange(
                general.projectLocation !== settings.projectLocation
              )}
            />
            <InputText
              name={"latLong"}
              label={"Latitude | Longitude"}
              value={settings.latLong}
              onChange={handleField}
              rightSection={handleChange(general.latLong !== settings.latLong)}
            />
          </Stack>
        </SettingsContainer>
        <SettingsContainer label={"Quick Toggles"} width={230}>
          <Stack spacing={"xs"}>
            <SwitchBinary
              name={"vrButton"}
              label={"VR Button"}
              checked={settings.vrButton}
              onChange={() =>
                setSettings({
                  ...settings,
                  vrButton: !settings.vrButton,
                })
              }
              updated={handleChange(quickToggles.vrButton != settings.vrButton)}
            />
            <Divider className={classes.divider} />
            <SwitchBinary
              label={"Email Button"}
              checked={settings.emailButton}
              onChange={() =>
                setSettings({
                  ...settings,
                  emailButton: !settings.emailButton,
                })
              }
              updated={handleChange(
                quickToggles.emailButton != settings.emailButton
              )}
            />
            <Divider className={classes.divider} />
            <SwitchBinary
              label={"Image Scaling"}
              checked={settings.imageScaling}
              onChange={() =>
                setSettings({
                  ...settings,
                  imageScaling: !settings.imageScaling,
                })
              }
              updated={handleChange(
                quickToggles.imageScaling != settings.imageScaling
              )}
            />
            <Divider className={classes.divider} />
            <SwitchBinary
              label={"Record Video"}
              checked={settings.recordVideo}
              onChange={() =>
                setSettings({
                  ...settings,
                  recordVideo: !settings.recordVideo,
                })
              }
              updated={handleChange(
                quickToggles.recordVideo != settings.recordVideo
              )}
            />
            <Divider className={classes.divider} />
            <SwitchBinary
              label={"View Image"}
              checked={settings.viewImage}
              onChange={() =>
                setSettings({
                  ...settings,
                  viewImage: !settings.viewImage,
                })
              }
              updated={handleChange(
                quickToggles.viewImage != settings.viewImage
              )}
            />
            <Divider className={classes.divider} />
            <SwitchBinary
              label={"Watermark"}
              checked={settings.watermark}
              onChange={() =>
                setSettings({
                  ...settings,
                  watermark: !settings.watermark,
                })
              }
              updated={handleChange(
                quickToggles.watermark != settings.watermark
              )}
            />
          </Stack>
        </SettingsContainer>
        <SettingsContainer
          label={"Logo"}
          width={450}
          rightSection={
            <>
              <input type="file" id="input_file" hidden />
              <ActionIcon onClick={handleLogoSelect}>
                <IconUpload strokeWidth={1.5} />
              </ActionIcon>
            </>
          }
        >
          <Stack spacing={"xs"}>
            <InputText
              name={"logoPath"}
              label={"Path"}
              value={settings.logoPath}
              onChange={handleField}
              rightSection={handleChange(logo.logoPath !== settings.logoPath)}
            />
            <Center py={10}>
              <img
                alt={"Project Logo"}
                src={settings.logoPath}
                height="70%"
                width="70%"
                style={{ objectFit: "contain" }}
              />
            </Center>
          </Stack>
        </SettingsContainer>
        <SettingsContainer label={"Paths"} width={420}>
          <Stack spacing={"xs"}>
            <InputText
              name={"assetsPath"}
              label={"Assets"}
              value={settings.assetsPath}
              onChange={handleField}
              rightSection={handleChange(
                paths.assetsPath !== settings.assetsPath
              )}
            />
            <InputText
              name={"imagesPath"}
              label={"Images"}
              value={settings.imagesPath}
              onChange={handleField}
              rightSection={handleChange(
                paths.imagesPath !== settings.imagesPath
              )}
            />
            <InputText
              name={"videosPath"}
              label={"Videos"}
              value={settings.videosPath}
              onChange={handleField}
              rightSection={handleChange(
                paths.videosPath !== settings.videosPath
              )}
            />
            <InputText
              name={"mapsPath"}
              label={"Maps"}
              value={settings.mapsPath}
              onChange={handleField}
              rightSection={handleChange(paths.mapsPath !== settings.mapsPath)}
            />
            <InputText
              name={"generatedPath"}
              label={"Generated"}
              value={settings.generatedPath}
              onChange={handleField}
              rightSection={handleChange(
                paths.generatedPath !== settings.generatedPath
              )}
            />
          </Stack>
        </SettingsContainer>
        <SettingsContainer label={"Filters"} width={360}>
          <Stack spacing={"sm"}>
            <Group position={"apart"}>
              <Text size={15} weight={500} pt={28} w={46} align={"center"}>
                Price
              </Text>
              <Group>
                <InputText
                  name={"minPrice"}
                  label={"Minimum"}
                  width={130}
                  value={settings.minPrice}
                  onChange={handleField}
                  rightSection={handleChange(
                    filters.price.min !== settings.minPrice
                  )}
                />
                <InputText
                  name={"maxPrice"}
                  label={"Maximum"}
                  width={130}
                  value={settings.maxPrice}
                  onChange={handleField}
                  rightSection={handleChange(
                    filters.price.max !== settings.maxPrice
                  )}
                />
              </Group>
            </Group>
            <Divider className={classes.divider} />
            <Group position={"apart"}>
              <Text size={15} weight={500} pt={28} w={46} align={"center"}>
                SQ
              </Text>
              <Group>
                <InputText
                  name={"minSq"}
                  label={"Minimum"}
                  width={130}
                  value={settings.minSq}
                  onChange={handleField}
                  rightSection={handleChange(filters.sq.min !== settings.minSq)}
                />
                <InputText
                  name={"maxSq"}
                  label={"Maximum"}
                  width={130}
                  value={settings.maxSq}
                  onChange={handleField}
                  rightSection={handleChange(filters.sq.max !== settings.maxSq)}
                />
              </Group>
            </Group>
          </Stack>
        </SettingsContainer>
        <SettingsContainer
          label={"Bedrooms"}
          width={320}
          rightSection={
            <Group>
              {handleChange(
                JSON.stringify(initialSettings.bedrooms) !==
                  JSON.stringify(bedroomsState)
              )}
              <ActionIcon onClick={() => setOpenAddBedroom(true)}>
                <IconPlus strokeWidth={1.5} />
              </ActionIcon>
            </Group>
          }
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleBedroomDragStart}
            onDragEnd={handleBedroomDragEnd}
            onDragCancel={handleBedroomDragCancel}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={bedroomsState}
              strategy={verticalListSortingStrategy}
            >
              {bedroomsState?.map((bedroom) => (
                <ListItemContainer reorder id={bedroom} key={bedroom}>
                  {bedroom}
                </ListItemContainer>
              ))}
            </SortableContext>
            <DragOverlay>
              {activeBedrooms ? (
                <ListItemContainer reorder id={activeBedrooms}>
                  {activeBedrooms}
                </ListItemContainer>
              ) : null}
            </DragOverlay>
          </DndContext>
        </SettingsContainer>
        <SettingsContainer
          label={"Displays"}
          width={380}
          rightSection={
            <Group>
              {handleChange(
                JSON.stringify(initialSettings.displays) !==
                  JSON.stringify(displaysState)
              )}
              <ActionIcon onClick={() => setOpenAddDisplay(true)}>
                <IconPlus strokeWidth={1.5} />
              </ActionIcon>
            </Group>
          }
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDisplayDragStart}
            onDragEnd={handleDisplayDragEnd}
            onDragCancel={handleDisplayDragCancel}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={displaysState.map((displays) => displays.label)}
              strategy={verticalListSortingStrategy}
            >
              {displaysState?.map((display, index) => (
                <ListItemContainer reorder id={display} key={index}>
                  <Stack spacing={4}>
                    <Text size={15} weight={500}>
                      {display.label}
                    </Text>
                    <Text size={14} weight={300} color={"dimmed"}>
                      {display.data}
                    </Text>
                  </Stack>
                </ListItemContainer>
              ))}
            </SortableContext>
            <DragOverlay>
              {activeDisplay ? (
                <ListItemContainer reorder id={activeDisplay}>
                  <Stack spacing={4}>
                    <Text size={15} weight={500}>
                      {activeDisplay.label}
                    </Text>
                    <Text size={14} weight={300} color={"dimmed"}>
                      {activeDisplay.data}
                    </Text>
                  </Stack>
                </ListItemContainer>
              ) : null}
            </DragOverlay>
          </DndContext>
        </SettingsContainer>
        <SettingsContainer
          label={"Pixel Streams"}
          width={380}
          rightSection={
            <Group>
              {handleChange(
                JSON.stringify(initialSettings.pixelStreams) !==
                  JSON.stringify(pixelStreamsState)
              )}
              <ActionIcon onClick={() => setOpenAddPixelStream(true)}>
                <IconPlus strokeWidth={1.5} />
              </ActionIcon>
            </Group>
          }
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handlePixelStreamDragStart}
            onDragEnd={handlePixelStreamDragEnd}
            onDragCancel={handlePixelStreamDragCancel}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={pixelStreamsState.map((pixelStream) => pixelStream.label)}
              strategy={verticalListSortingStrategy}
            >
              {pixelStreamsState?.map((display, index) => (
                <ListItemContainer reorder id={display} key={index}>
                  <Stack spacing={4}>
                    <Text size={15} weight={500}>
                      {display.label}
                    </Text>
                    <Text size={14} weight={300} color={"dimmed"}>
                      {display.data}
                    </Text>
                  </Stack>
                </ListItemContainer>
              ))}
            </SortableContext>
            <DragOverlay>
              {activePixelStream ? (
                <ListItemContainer reorder id={activePixelStream}>
                  <Stack spacing={4}>
                    <Text size={15} weight={500}>
                      {activePixelStream.label}
                    </Text>
                    <Text size={14} weight={300} color={"dimmed"}>
                      {activePixelStream.data}
                    </Text>
                  </Stack>
                </ListItemContainer>
              ) : null}
            </DragOverlay>
          </DndContext>
        </SettingsContainer>
        <SettingsContainer
          label={"Agent Emails"}
          width={380}
          rightSection={
            <Group>
              {handleChange(
                JSON.stringify(initialSettings.agentEmails) !==
                  JSON.stringify(agentEmails)
              )}
              <ActionIcon onClick={() => setOpenAddEmail(true)}>
                <IconPlus strokeWidth={1.5} />
              </ActionIcon>
            </Group>
          }
        >
          {agentEmails?.map((agent, index) => (
            <ListItemContainer id={agent} key={index}>
              <Stack spacing={4}>
                <Text size={15} weight={500}>
                  {agent.name}
                </Text>
                <Text size={14} weight={300} color={"dimmed"}>
                  {agent.email}
                </Text>
              </Stack>
            </ListItemContainer>
          ))}
        </SettingsContainer>
        <SettingsContainer
          label={"Custom"}
          width={500}
          rightSection={
            <>
              {handleChange(
                JSON.stringify(code) !== JSON.stringify(settings.code)
              )}
            </>
          }
        >
          <Textarea
            name={"code"}
            placeholder={"JSON"}
            value={settings.code}
            variant={"filled"}
            minRows={6}
            onChange={handleField}
            styles={{
              input: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.fn.rgba(theme.colors.gray[3], 0.5),
              },
            }}
          />
        </SettingsContainer>
      </Flex>
      <AddBedroom
        open={openAddBedroom}
        onClose={() => setOpenAddBedroom(false)}
      />
      <AddConnection
        type={"Display"}
        open={openAddDisplay}
        onClose={() => setOpenAddDisplay(false)}
      />
      <AddConnection
        type={"Pixel Stream"}
        open={openAddPixelStream}
        onClose={() => setOpenAddPixelStream(false)}
      />
      <AddAgentEmail
        open={openAddEmail}
        onClose={() => setOpenAddEmail(false)}
      />
      <SaveSettings
        open={openSaveSettings}
        onClose={() => setOpenSaveSettings(false)}
        settings={compareObjects(initialSettings, settings)}
      />
    </>
  );
};

export default Overview;
