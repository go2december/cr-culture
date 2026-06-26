type RichTextNode = {
    type?: string
    tag?: string
    text?: string
    format?: number
    url?: string
    newTab?: boolean
    children?: RichTextNode[]
} | null | undefined

const escapeHtml = (value: string) => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const applyTextFormat = (value: string, format?: number) => {
    if (!format) {
        return value
    }

    let result = value

    if (format & 1) result = `<strong>${result}</strong>`
    if (format & 2) result = `<em>${result}</em>`
    if (format & 8) result = `<u>${result}</u>`
    if (format & 4) result = `<s>${result}</s>`

    return result
}

const renderInline = (nodes?: RichTextNode[]): string => {
    return (nodes || []).map((node) => {
        if (!node) {
            return ''
        }

        if (typeof node.text === 'string') {
            return applyTextFormat(escapeHtml(node.text), node.format)
        }

        if (node.type === 'link') {
            const href = typeof node.url === 'string' ? node.url : '#'
            const target = node.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
            return `<a href="${escapeHtml(href)}"${target}>${renderInline(node.children)}</a>`
        }

        return renderInline(node.children)
    }).join('')
}

const renderBlock = (node: RichTextNode): string => {
    if (!node) {
        return ''
    }

    switch (node.type) {
        case 'heading': {
            const tag = node.tag === 'h1' || node.tag === 'h2' || node.tag === 'h3' || node.tag === 'h4'
                ? node.tag
                : 'h2'
            return `<${tag}>${renderInline(node.children)}</${tag}>`
        }
        case 'quote':
            return `<blockquote>${renderInline(node.children)}</blockquote>`
        case 'list':
            return node.tag === 'ol'
                ? `<ol>${(node.children || []).map(renderBlock).join('')}</ol>`
                : `<ul>${(node.children || []).map(renderBlock).join('')}</ul>`
        case 'listitem':
            return `<li>${renderInline(node.children)}</li>`
        case 'paragraph':
        default: {
            const content = renderInline(node.children)
            return content.trim() ? `<p>${content}</p>` : ''
        }
    }
}

export const richTextToHtml = (value: unknown): string | null => {
    if (!value || typeof value !== 'object') {
        return null
    }

    const root = value as { root?: { children?: RichTextNode[] } }
    const children = root.root?.children

    if (!Array.isArray(children) || children.length === 0) {
        return null
    }

    return children.map(renderBlock).join('')
}
