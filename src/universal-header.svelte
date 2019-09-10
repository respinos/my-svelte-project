<script>
  import { css } from 'emotion';
  import {
    COLORS,
    TYPOGRAPHY,
    SPACING,
    MEDIA_QUERIES,
    Margins,
    LargeScreen,
    SmallScreen,
    LINK_STYLES,
    Z_SPACE,
  } from './shared/styles'

  let items;
  let isOpen = false;

  let styles = {};
  let linkss = {};

  linkss.special = css(LINK_STYLES['special']);
  linkss.listStrong = css(LINK_STYLES['links-strong']);

  styles.linkLink = css(
    Object.assign(
      LINK_STYLES['list-strong'],
      {
        display: 'block',
        padding: SPACING['M'],
        ':hover': {
          boxShadow: 'none'
        },
        ':hover span': LINK_STYLES['list-strong'][':hover'],
        [MEDIA_QUERIES.LARGESCREEN]: {
          display: 'inline',
          padding: '0'
        }
      }
    )
  )

  styles.container = css({
    background: COLORS.blue[100]
  });

  styles.content = css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${SPACING['2XS']} 0`
  });

  styles.headerSpan = css({
    ...TYPOGRAPHY['3XS'],
    color: COLORS.neutral[300]
  })

  styles.sitesButton = css({
    ...LINK_STYLES['special'],
    ':hover': {
      'span': LINK_STYLES['special'][':hover']
    }
  })

  styles.sitesContainer = css({
    display: 'inline-block',
    position: 'relative'
  })

  styles.overlay = css({
    background: 'white',
    zIndex: '10',
    position: `absolute`,
    left: `auto`,
    right: `0`,
    marginLeft: SPACING['XL'],
    marginBottom: SPACING['L'],
    padding: '0',
    borderRight: '0',
    width: '20rem',
    marginRight: `-${SPACING['M']}`,
    ...Z_SPACE[8],
    [MEDIA_QUERIES.LARGESCREEN]: {
      marginRight: '0',
      padding: SPACING['XL'],
      width: `862px`,
      maxWidth: `calc(100vw - ${SPACING['2XL']} * 2)`, // less the margins
    }
  })

  styles.sitesLede = css({
    display: 'none',
    [MEDIA_QUERIES.LARGESCREEN]: {
      display: 'block',
      ...TYPOGRAPHY['L'],
      padding: 0,
      marginBottom: SPACING['L'],
    }
  })

  styles.linksContainer = css({
    [MEDIA_QUERIES.LARGESCREEN]: {
      'ul:first-of-type': {
        marginBottom: SPACING['M']
      },
      display: 'flex',
      justifyContent: 'space-between',
      'ul:last-of-type': {
        minWidth: '16rem',
        margin: '0',
        marginLeft: SPACING['XL'],
        paddingLeft: SPACING['XL'],
        borderLeft: `solid 1px ${COLORS.neutral[100]}`,
        'li': {
          marginBottom: SPACING['S'],
        }
      }
    },
    'ul:last-of-type li:last-of-type': {
      border: 'none'
    }
  })

  styles.linkItem = css({
    borderBottom: `solid 1px ${COLORS.neutral[100]}`,
    [MEDIA_QUERIES.LARGESCREEN]: {
      border: 'none',
      position: 'relative',
      maxWidth: '32rem',
      ':not(:last-child)': {
        marginBottom: '1rem'
      }
    }
  })

  styles.linkDescription = css({
    borderBottom: `solid 1px ${COLORS.neutral[100]}`,
    [MEDIA_QUERIES.LARGESCREEN]: {
      border: 'none',
      position: 'relative',
      maxWidth: '32rem',
      ':not(:last-child)': {
        marginBottom: '1rem'
      }
    }
  })

  styles.loadingContainer = css({
    borderBottom: `solid 1px ${COLORS.neutral[100]}`,
    [MEDIA_QUERIES.LARGESCREEN]: {
      border: 'none',
      position: 'relative',
      maxWidth: '32rem',
      ':not(:last-child)': {
        marginBottom: '1rem'
      }
    }
  })

  function transformData(data) {
    return {
      primary: data.filter(item => item.level === "1"),
      secondary: data.filter(item => item.level === "2")
    };
  }

  function handleClick(event) {
    isOpen = ! isOpen;
  }

  $: fetch("https://cms.dev.lib.umich.edu/api/universalheader")
      .then(r => r.json())
      .then(data => {
        items = transformData(data);
      });
</script>

<style>
</style>

<header class="{styles.container}" aria-label="View our other U-M Library sites">
  <div class="{Margins}">
    <div class="{styles.content}">
      <a class="{linkss.special}" href="https://www.lib.umich.edu/">University of Michigan Library</a>
      <div class="{styles.sitesContainer}">
        <button class="{styles.sitesButton}" on:click={handleClick}><span>Explore</span></button>
        {#if isOpen}
        <div class="{styles.overlay}">
          <p class="{styles.sitesLede}">
            Explore what the library has to offer.
          </p>
          <div class="{styles.linksContainer}">
            <ul>
              {#each items.primary as link, i}
              <li class="{styles.linkItem}">
                <a class="{styles.linkLink}" href="{link.link}">
                  <span>{link.title}</span>
                </a>
                {#if link.description}
                <p>{link.description}</p>
                {/if}
              </li>
              {/each}
            </ul>
            <ul>
              {#each items.secondary as link, i}
              <li class="{styles.linkItem}">
                <a class="{styles.linkLink}" href="{link.link}">
                  <span>{link.title}</span>
                </a>
                {#if link.description}
                <p>{link.description}</p>
                {/if}
              </li>
              {/each}
            </ul>
          </div>
        </div>
        {/if}
      </div>
    </div>
  </div>
</header>